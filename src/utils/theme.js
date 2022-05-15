import { createMuiTheme } from "@material-ui/core/styles";
import { red, indigo } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: indigo,
    error: {
      main: red.A400,
    },
  },
});

export default theme;
