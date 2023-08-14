import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeOptions, PaletteMode } from "@mui/material";

interface Colors {
  [key: string]: {
    [key: number]: string;
  };
}

interface CustomPalette extends ThemeOptions {
  palette: {
    mode?: PaletteMode;
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    neutral: {
      dark: string;
      main: string;
      light: string;
    };
    background: {
      default: string;
    };
  };
}

type mode = "dark" | "light";

export const colors = (mode: mode): Colors => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        pinkAccent: {
          100: "#fde4eb",
          200: "#f9bad3",
          300: "#f590bb",
          400: "#f267a3",
          500: "#ee3d8b",
          600: "#d03675",
          700: "#ac2f5f",
          800: "#882949",
          900: "#621232",
        },
        orangeAccent: {
          100: "#ffebd4",
          200: "#ffd1a9",
          300: "#ffb57e",
          400: "#ffa054",
          500: "#ff8541",
          600: "#e06a3a",
          700: "#b85232",
          800: "#923a28",
          900: "#6d221f",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0",
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        pinkAccent: {
          100: "#621232",
          200: "#882949",
          300: "#ac2f5f",
          400: "#d03675",
          500: "#ee3d8b",
          600: "#f267a3",
          700: "#f590bb",
          800: "#f9bad3",
          900: "#fde4eb",
        },
        orangeAccent: {
          100: "#6d221f",
          200: "#923a28",
          300: "#b85232",
          400: "#e06a3a",
          500: "#ff8541",
          600: "#ffa054",
          700: "#ffb57e",
          800: "#ffd1a9",
          900: "#ffebd4",
        },
      }),
});

const themeSettings = (mode: PaletteMode): CustomPalette => {
  const color = colors(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: color.primary[500],
            },
            secondary: {
              main: color.greenAccent[500],
            },
            neutral: {
              dark: color.grey[700],
              main: color.grey[500],
              light: color.grey[100],
            },
            background: {
              default: color.primary[500],
            },
          }
        : {
            primary: {
              main: color.primary[100],
            },
            secondary: {
              main: color.greenAccent[500],
            },
            neutral: {
              dark: color.grey[700],
              main: color.grey[500],
              light: color.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 28,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
      body1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
      },
      subtitle1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 10,
      },
      subtitle2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 9,
      },
    },
  };
};

export const ColorModeContext = createContext<{
  toggleColorMode: () => void;
}>({
  toggleColorMode: () => {},
});

export const useMode = (): [
  ThemeOptions,
  {
    toggleColorMode: () => void;
  }
] => {
  const storedMode = localStorage.getItem("colorMode") as PaletteMode;
  const [mode, setMode] = useState<PaletteMode>(storedMode || "dark");

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev: string) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
