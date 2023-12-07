const gm = require('gm').subClass({ imageMagick: true });
import * as gmType from 'gm';

export class Artwork {

  private image: gmType.State;

  constructor(private imageBuffer: Buffer) {
    this.image = gm(imageBuffer);
  }

  public getFormat = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      this.image.format((err, format) => (err) ? reject(err) : resolve(format));
    });
  }

  public getSize = (): Promise<{ width: number, height: number }> => {
    return new Promise((resolve, reject) => {
      this.image.size((err, size) => (err) ? reject(err) : resolve(size));
    });
  }

  public saveToFile = (path: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.image.write(path, (err) => (err) ? reject(err) : resolve());
    });
  }
}