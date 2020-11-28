import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple, amber, grey, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: grey[500],
      main: grey[700],
    },
    secondary: {
      light: red[500],
      main: "#B81C1C", // red
      dark: "#C13838", // red
      contrastText: "#fff",
    },
  },
});

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#313131",
      main: grey[900],
      contrastText: "#C44714", // dark orange
    },
    secondary: {
      main: amber[500],
      contrastText: "#C13838",
    },
    error: {
      light: red[500],
      main: "#B81C1C", // red
      dark: "#C13838", // red
      contrastText: "#fff",
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
        color: themeDark.palette.error.light,
      },
      fontWeight: 500,
      backgroundColor: themeDark.palette.primary.light
    },
  },
  MuiInput: {
    root: {
      "&$underline:after": {
        borderBottomColor: themeDark.palette.error.main,
      }
    },
  },
  MuiInputLabel: {
    root: {
      "&$focused": {
        color: themeDark.palette.error.light
      }
    }
  },
  MuiTooltip: {
    tooltip: {
      backgroundColor: "#fff",
      color: themeDark.palette.primary.light,
    },
    arrow: {
      color: "#fff",
    },
  },
};

const themeProps = {
  MuiTooltip: {
    arrow: true,
  },
};

theme.props = themeProps;
theme.overrides = themeOverrides;
themeDark.props = themeProps;
themeDark.overrides = themeOverrides;

const Theme = (props) => {
  const { children, darkMode } = props;
  const setTheme = darkMode ? theme : themeDark;
  return <ThemeProvider theme={setTheme}>{children}</ThemeProvider>;
};

export const withTheme = (Component) => {
  return (props) => {
    const [darkMode, setDarkMode] = useState(false);
    return (
      <Theme darkMode={darkMode}>
        <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
      </Theme>
    );
  };
};
