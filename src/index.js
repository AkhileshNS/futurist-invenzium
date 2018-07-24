//External Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router-dom/BrowserRouter';

//Internal Libraries
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
