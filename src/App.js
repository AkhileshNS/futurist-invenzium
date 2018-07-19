//External Libraries
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

//Internal Libraries
import './App.css';

//Path Components;
import Welcome from './containers/Welcome/Welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Welcome}/>
        </Switch>
      </div>
    );
  }
}

export default App;
