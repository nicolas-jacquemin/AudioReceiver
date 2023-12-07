import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';
import { AirplayData, AirplayEvents, AirplayMetadata } from "src/types/AirplayTypes";
import { Artwork } from "../artwork";

const ShairportReader = require('shairport-sync-reader');

@Injectable()
export class AirplayService {

  private sesionPath = "/storage/airplay"
  private cachePath = `/.cache`

  constructor() {
    let pipeReader = new ShairportReader({
      path: `${this.sesionPath}/metadata`
    });

    pipeReader.on('meta', (meta: AirplayData['meta']) => {
      this.data.meta = meta;

      this.metadata.track = {
        title: meta?.minm,
        artist: meta?.asar,
        album: meta?.asal,
      };

      this.updateEvent('trackInfos', this.metadata.track);
    });

    pipeReader.on('PICT', async (pict: string) => {
      const buf = Buffer.from(pict, 'base64');
      try {
        const image = new Artwork(buf);
        const imageSize = await image.getSize();
        const imageFormat = await image.getFormat();
        const imagePath = `${this.getTrackChecksum()}.${imageFormat.toLocaleLowerCase()}`;
        image.saveToFile(`${this.cachePath}/artwork/${imagePath}`);

        this.metadata.artwork = {
          url: `cache/artwork/${imagePath}`,
          meta: {
            dimensions: imageSize,
          }
        }
      } catch (_e) {
        console.error(`cannot save image`, _e);
      }
    });

    pipeReader.on('pvol', (pvol: AirplayData['pvol']) => {
      this.data.pvol = pvol;

      this.metadata.session.volume = {
        lowest: pvol?.lowest || 0,
        volume: pvol?.volume || 0,
        highest: pvol?.highest || 0,
      };

      this.updateEvent('sessionInfo', this.metadata.session);
    });

    pipeReader.on('prgr', (prgr: AirplayData['prgr']) => {
      this.data.prgr = prgr;

      if (prgr?.end && prgr?.start && prgr?.current)
        this.metadata.session.program = {
          duration: Math.floor((prgr.end - prgr.start) / 44100),
          current: Math.floor((prgr.current - prgr.start) / 44100),
        }

        this.updateEvent('sessionInfo', this.metadata.session);
    });

    pipeReader.on('prsm', () => {
      this.metadata.session.state = 'playing';

      this.updateEvent('sessionInfo', this.metadata.session);
      this.updateEvent('play');
    })

    pipeReader.on('pfls', () => {
      this.metadata.session.state = 'paused';

      this.updateEvent('sessionInfo', this.metadata.session);
      this.updateEvent('pause');
    });

    pipeReader.on('pend', () => {
      this.metadata.session.state = 'closed';

      this.updateEvent('sessionInfo', this.metadata.session);
      this.updateEvent('end');
    });

    setInterval(() => {
      if (this.metadata.session.program?.current !== undefined && this.metadata.session.state === 'playing')
        this.metadata.session.program.current += 1;
    }, 1000);

  }

  private getTrackChecksum = () => {
    return crypto.createHash('md5').update(`${this.metadata.track?.artist}-${this.metadata.track?.title}`).digest('base64url');
  }

  private data: AirplayData = {};
  private metadata: AirplayMetadata = {
    session: {
      state: 'closed',
    },
  };

  private events: AirplayEvents = {};
  private updateEvent = (eventName: keyof AirplayEvents, payload?: any) => {
    for (const event of this.events[eventName] || []) {
      if (event instanceof Function)
        if (payload)
          event(this.metadata.session, payload);
        else
          event(this.metadata.session);
    }
  }


  public getTrack = () => ({
    ...this.metadata.track,
    artwork: this.metadata.artwork
  });
  public getSession = () => this.metadata.session;

  public getSummary = () => ({
    track: this.getTrack(),
    session: this.getSession(),
    type: 'Airplay'
  });

}