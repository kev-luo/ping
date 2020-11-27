import { createMuiTheme } from '@material-ui/core';
import { deepPurple, amber} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500]
    },
    secondary: {
      main: amber[500],
      contrastTest: deepPurple[500]
    }
  }
})

theme.props = {
  MuiButton: {
    disableElevation: true,
  }
}

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 0,
      textTransform: "none"
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: amber[500],
        color: deepPurple[900],
      }
    },
    containedSecondary: {
      fontWeight: 700
    }
  }
}

export default theme;