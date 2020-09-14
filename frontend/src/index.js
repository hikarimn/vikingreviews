import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

const themeObject = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#59b4fe",
      dark: "#008dff",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d5ecff",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
  overrides: {
    MuiTypography: {
      h2: {
        textShadow: "4px 4px 0px rgba(0,0,0,0.15)",
      },
      h3: {
        textShadow: "4px 4px 0px rgba(0,0,0,0.15)",
      },
    },
  },
};

themeObject.shadows = ["none"];
Array.from(Array(24).keys(), (i) => i + 1).map(
  (i) =>
    (themeObject.shadows = [
      ...themeObject.shadows,
      `${i}px ${i}px 0px rgba(0,0,0,0.15)`,
    ])
);

const theme = createMuiTheme(themeObject);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
