import React from "react";
import ReactDOM from "react-dom/client";
import "react-simple-keyboard/build/css/index.css";
import "./output.css";
import Game from "./Game";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Game />
    <div>
      <Toaster position="top-center" />
    </div>
  </React.StrictMode>
);
