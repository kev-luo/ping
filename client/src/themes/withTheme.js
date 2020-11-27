import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple, amber, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: grey[800],
    },
    secondary: {
      main: "#C13838",
      contrastText: deepPurple[500],
    },
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey[900],
    },
    secondary: {
      main: amber[500],
      contrastTest: deepPurple[500],
    },
  },
});

const themeOverrides = {
  MuiButton: {
    root: {
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
      color: theme.palette.primary.main,
    },
    arrow: {
      color: theme.palette.primary.main,
    },
  },
};

const themeProps = {
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
  },
}

theme.props = themeProps;
theme.overrides = themeOverrides;
themeDark.props = themeProps;
themeDark.overrides = themeOverrides;

const Theme = (props) => {
  const { children, darkMode } = props;
  const setTheme = darkMode ? themeDark : theme
  return <ThemeProvider theme={setTheme}>{children}</ThemeProvider>;
};

export const withTheme = (Component) => {
  return (props) => {
    const [darkMode, setDarkMode] = useState(false);
    return (
      <Theme darkMode={darkMode}>
        <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode}/>
      </Theme>
    )
  }
}