import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">RayHelper</h1>
      <p className="mt-2">A troubleshooting tool for macOS and Windows.</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));