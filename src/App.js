import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <h1>Team Task Manager</h1>
      <Signup />
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;