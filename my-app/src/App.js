import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quizapp from './Componenets/Quiz'
import signin from "./Componenets/Signin/Signin"
import signup from './Componenets/Signup/Signup'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/quizapp" component={Quizapp} />
          <Route exact path="/" component={signin} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
