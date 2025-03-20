import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { rem } from "polished";

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1536,
    },
  },
  shadows: Array(25).fill("none"),
  typography: {
    fontFamily: [
      "Montserrat",
      "PT Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#0094E3",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": { disableGeneration: true },
        html: {
          "@media (max-width: 960px)": {
            padding: 0,
          },
          padding: "280px 0 0 0",
          background: "#171717",
          minWidth: 508,
        },
        body: {
          color: "unset",
          backgroundColor: "unset",
          fontSize: rem(13),
        },
        i: {
          fontStyle: "normal",
        },
        a: {
          textDecoration: "none",
        },
        "h1, h2, h3, h4, h5, h6": {
          fontWeight: 500,
          marginBlockStart: "1.25rem",
          marginBlockEnd: ".625rem",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        regular: {
          "@media (min-width: 600px)": {
            minHeight: "55px",
          },
        },
      },
    },
  },
});

export default theme;
