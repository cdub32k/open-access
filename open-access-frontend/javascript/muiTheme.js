import { createMuiTheme } from "@material-ui/core/styles";

const primary = "#7FB069";
const secondary = "#E6AA68";
const background = "#FFFBBD";
const alert = "#CA3C25";
const dark = "#1D1A05";
const darkLight = "#51490e";
const light = "#FFF";
const lightDark = "#fffbbd";
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
    light: {
      main: light,
      dark: lightDark,
    },
    text: {
      primary: dark,
      secondary: darkLight,
      light: "white",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h1: { color: dark },
    h2: { color: dark, fontSize: 42, fontWeight: 700 },
    h3: { color: dark, fontSize: 34 },
    h4: {
      fontSize: 18,
      fontWeight: 700,
      color: dark,
    },
    h5: { color: dark, fontSize: 18, fontWeight: 700 },
    h6: { color: dark },
    subtitle1: { color: dark, fontSize: 18, letterSpacing: 1.1 },
    subtitle2: { color: dark, fontSize: 12, fontWeight: 700 },
    body1: { color: dark, fontSize: 13, lineHeight: 2 },
    body2: { color: dark, fontSize: 10 },
    button: { color: dark },
    caption: { color: dark, fontSize: 12 },
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
