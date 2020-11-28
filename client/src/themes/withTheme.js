import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple, amber, grey, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: grey[700],
      main: grey[800],
      dark: grey[900],
      contrastText: "#fff",
    },
    secondary: {
      light: red[500],
      main: red[700],
      dark: "#C13838", // deep red
      contrastText: "#fff",
    },
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: grey[800],
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
        color: theme.palette.secondary.light,
      },
    },
    containedSecondary: {
      fontWeight: 700,
    },
  },
  MuiInput: {
    root: {
      padding: theme.spacing(1),
      "&$focused": {
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
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
  const setTheme = darkMode ? theme : themeDark
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