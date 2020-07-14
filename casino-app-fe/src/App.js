import React from 'react';
import './App.css';
import games from './games-until/games'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";

function App() {
  console.log(games[1].aloha.url);
  return (

    <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <div class="container">
                <div class="grid">
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[0].threeHitPay.url} alt="test" class="item large"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                <img src={games[1].aloha.url} alt="test" class="item"></img>
                  </div>
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
  );
}

export default App;
