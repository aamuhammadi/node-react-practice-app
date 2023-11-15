import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupForm from "../src/components/SignupForm";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <LoginForm />
      <SignupForm />
    </div>
  );
}

export default App;
