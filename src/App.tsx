import React from "react";
import "./App.css";
import { AppViews } from "./pages";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <AppViews />
    </div>
  );
}

export default App;
