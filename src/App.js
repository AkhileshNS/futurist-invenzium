//External Libraries
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

//Internal Libraries
import AppBar from './containers/AppBar/AppBar';

//Path Components;
import Welcome from './containers/Welcome/Welcome';
import Caching from './containers/Caching/Caching';
import Manifest from './containers/Manifest/Manifest';
import Indexed from './containers/Indexed/Indexed';
import BackgroundSync from './containers/BackgroundSync/BackgroundSync';
import WebPushNotifications from './containers/WebPushNotifications/WebPushNotifications';
import NativeDeviceFeatures from './containers/NativeDeviceFeatures/NativeDeviceFeatures';

const cssClassName = "App";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      deferredPrompt: null
    }
  }

  componentDidMount() {
    window.scrollTo(0,0);
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      console.log('beforeinstallevent triggereds');
      this.setState({
        deferredPrompt: e
      });
    });
  }

  showPrompt = () => {
    if(this.state.deferredPrompt!=null){
      let dPrompt = this.state.deferredPrompt;
      dPrompt.prompt();
      dPrompt.userChoice
      .then((res) => {
        if(res.outcome==='accepted'){
          this.setState({
            deferredPrompt: null
          })
        }
      });
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
          <Route path="/" component={Welcome} exact/>
          <Route path="/Caching" component={Caching} exact/>
          <Route path="/Manifest" render={(props) => <Manifest {...props} deferredPrompt={this.state.deferredPrompt} showPrompt={this.showPrompt}/>} exact/>
          <Route path="/IndexedDB" component={Indexed} exact/>
          <Route path="/BackgroundSync" component={BackgroundSync} exact/>
          <Route path="/Web Push Notifications" component={WebPushNotifications} exact/>
          <Route path="/Native Device Features" component={NativeDeviceFeatures} exact/>
        </Switch>
      </div>
    );
  }
}

export default App;
