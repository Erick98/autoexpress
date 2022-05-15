import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import Login from "./pages/Login";
import theme from "./utils/theme";
import Registry from "./pages/Registry";

const routes = (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route path="/registro" component={Registry} />
        <Route path="/iniciar-sesion" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

ReactDOM.render(routes, document.getElementById("root"));

serviceWorker.unregister();
