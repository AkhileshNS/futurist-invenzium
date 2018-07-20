//External Libraries
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

//Internal Libraries
import './App.css';
import AppBar from './containers/AppBar/AppBar';

//Path Components;
import Welcome from './containers/Welcome/Welcome';

const cssClassName = "App";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  showMenu = () => {
    let currentShow = this.state.show;
    this.setState({
      show: !currentShow
    });
  }

  render() {

    return (
      <div className={cssClassName}>
        <AppBar show={this.state.show} showMenu={this.showMenu}/>
        <Switch>
          <Route path="/" component={Welcome}/>
        </Switch>
      </div>
    );
  }
}

export default App;
