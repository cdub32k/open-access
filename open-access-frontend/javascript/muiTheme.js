import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4a148c",
    },
    secondary: {
      main: "#ff6f00",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
