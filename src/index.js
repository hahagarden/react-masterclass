import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
}; /* Object(darkTheme) that has some properties(textColor, backgroundColor), give this object to ThemeProvider
and then every components inside ThemeProvider can access the properties of the object */
const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
}; /* For darkmode and lightmode, name of properties should be same and 
it only needs to change props of ThemeProvider, 
theme={object-name} */

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
