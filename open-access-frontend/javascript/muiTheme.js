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
    h1: { color: dark },
    h2: { color: dark },
    h3: { color: dark },
    h4: {
      fontSize: 18,
      fontWeight: 700,
      color: dark,
    },
    h5: { color: dark },
    h6: { color: dark },
    subtitle1: { color: dark },
    subtitle2: { color: dark, fontSize: 10 },
    body1: { color: dark, fontSize: 12 },
    body2: { color: dark, fontSize: 11 },
    button: { color: dark },
    caption: { color: dark },
    overline: { color: dark },

    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  globalClasses: {
    icon: {
      fill: dark,
    },
    badge: {
      backgroundColor: alert,
      color: "white",
    },
  },
});

export default theme;
