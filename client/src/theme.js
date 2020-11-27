import { createMuiTheme } from "@material-ui/core";
import { deepPurple, amber, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: amber[500],
      contrastTest: deepPurple[500],
    },
  },
});

theme.props = {
  MuiButton: {
    disableElevation: true,
  },
  MuiInputLabel: {
    shrink: true,
  },
  MuiInput: {
    disableUnderline: true,
  },
  MuiTooltip: {
    arrow: true,
  }
};

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 0,
      textTransform: "none",
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: amber[500],
        color: deepPurple[900],
      },
    },
    containedSecondary: {
      fontWeight: 700,
    },
  },
  MuiInput: {
    root: {
      top: theme.spacing(2),
      border: `1px solid ${grey[500]}`,
      padding: theme.spacing(1),
      outline: "1px solid transparent",
      "&$focused": {
        border: `1px solid ${theme.palette.primary.main}`,
        outline: `1px solid ${theme.palette.primary.main}`,
      },
    },
  },
  MuiInputLabel: {
    root: {
      textTransform: "uppercase",
      fontSize: "1.5rem",
    },
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: "#fff",
      border: `2px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main
    },
    arrow: {
      color: theme.palette.primary.main,
    }
  }
};

export default theme;
