import { createMuiTheme } from "@material-ui/core/styles";

const primary = "#7FB069";
const secondary = "#E6AA68";
const background = "#FFFBBD";
const alert = "#CA3C25";
const dark = "#1D1A05";
const darkLight = "#51490e";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      light: "#a1c591",
      dark: "#61904c",
    },
    secondary: {
      main: secondary,
      light: "#efc89d",
      dark: "#dd8c33",
    },
    background: {
      main: background,
      light: "#fffffa",
      dark: "#fff780",
    },
    alert: {
      main: alert,
      light: "#df624e",
      dark: "#962d1c",
    },
    dark: {
      main: dark,
      light: "#51490e",
    },
    text: {
      primary: dark,
      secondary: darkLight,
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  overrides: {},
});

export default theme;
