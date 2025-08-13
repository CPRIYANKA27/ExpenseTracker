import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  return (
    <div>
      <h1 style={{ textAlign: "left", margin: "16px 0", color: "white" }}>
        Expense Tracker
      </h1>
      <Dashboard />
    </div>
  );
}
