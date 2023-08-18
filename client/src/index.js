import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div style={{ width: "100vw", background: "white" }}>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
