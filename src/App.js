import React from "react";
import CurrencyTracker from "./components/tracker";

var App = () => {
  return (
    <div className="container">
      <h1>BTC2USD</h1>
      <CurrencyTracker />
    </div>
  );
};
export default App;
