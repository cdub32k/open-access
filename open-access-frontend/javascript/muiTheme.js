import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#b891d8",
    },
    secondary: {
      main: "#d6c284",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
