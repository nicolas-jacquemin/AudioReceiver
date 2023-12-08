type AirplayMeta = {
  asai: string;
  asar: string;
  minm: string;
  asal: string;
  asyr: string;
  astm: string | undefined;
}

type AirplayVolume = {
  volume?: number;
  lowest?: number;
  highest?: number;
}

type AirplayProgram = {
  start?: number;
  current?: number;
  end?: number;
}

type AirplayMetaProgram = {
  current?: number;
  duration?: number;
}

export interface AirplayData {
  meta?: AirplayMeta;
  pvol?: AirplayVolume;
  prgr?: AirplayProgram;
  PICT?: string;
}

export type AirplayMetaArtwork = {
  dimensions?: {
    width: number;
    height: number;
  };
  palette?: {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    spanColorContrast: string;
  }
}

export interface AirplayMetadata {
  track?: {
    title?: string;
    artist?: string;
    album?: string;
    duration?: number;
  };
  session: {
    volume?: AirplayVolume;
    program?: AirplayMetaProgram;
    state: 'playing' | 'paused' | 'closed';
  };
  artwork?: {
    url: string;
    meta: AirplayMetaArtwork;
  } | false;
}

export interface AirplayEvents {
  trackInfos?: [(...args: any) => void];
  artworkInfos?: [(...args: any) => void];
  sessionInfo?: [(...args: any) => void];
  play?: [(...args: any) => void];
  pause?: [(...args: any) => void];
  end?: [(...args: any) => void];
}