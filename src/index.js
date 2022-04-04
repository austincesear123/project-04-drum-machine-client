import React from "react";
import ReactDOM from "react-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
// import * as Tone from "tone";

// document.documentElement.addEventListener("mousedown", () => {
//   if (Tone.context.state !== "running") {
//     console.log("running");
//     Tone.context.resume();
//   }
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
