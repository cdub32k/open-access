import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffd180",
    },
    secondary: {
      main: "#c0ca33",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
