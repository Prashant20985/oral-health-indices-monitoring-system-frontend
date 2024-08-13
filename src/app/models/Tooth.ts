/**
 * Represents a tooth with four surfaces.
 */
export interface FourSurfaceTooth {
  b: string;
  l: string;
  d: string;
  m: string;
}

/**
 * Represents a tooth with five surfaces, extending the FourSurfaceTooth interface.
 *
 * @remarks
 * This interface includes an additional property "o" of type string.
 */
export interface FiveSurfaceToothBewe extends FourSurfaceTooth {
  o: string;
}

/**
 * Represents a tooth with five surfaces got DMFT/DMFS tooth input.
 */
export interface FiveSurfaceToothDMFT_DMFS extends FourSurfaceTooth {
  r: string;
}

/**
 * Represents a tooth with six surfaces.
 */
export interface SixSurfaceTooth extends FiveSurfaceToothBewe {
  r: string;
}
