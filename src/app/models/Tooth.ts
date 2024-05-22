export interface FourSurfaceTooth {
  b: string;
  l: string;
  d: string;
  m: string;
}

export interface FiveSurfaceToothBewe extends FourSurfaceTooth {
  o: string;
}

export interface FiveSurfaceToothDMFT_DMFS extends FourSurfaceTooth {
  r: string;
}

export interface SixSurfaceTooth extends FiveSurfaceToothBewe {
  r: string;
}
