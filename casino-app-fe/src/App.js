import React from 'react';
import './App.css';
import HomePage from './components/homepage/Homepage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <HomePage></HomePage>
              </Route>
            </Switch>
          </div>
        </Router>
  );
}

export default App;
