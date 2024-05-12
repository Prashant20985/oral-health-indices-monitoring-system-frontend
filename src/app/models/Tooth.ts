export interface FourSurfaceTooth {
  b: string;
  l: string;
  d: string;
  m: string;
}

export interface FiveSurfaceTooth extends FourSurfaceTooth {
  r: string;
}

export interface SixSurfaceTooth extends FiveSurfaceTooth {
  o: string;
}
