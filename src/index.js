import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './redux_setup/rootReducer';
import App from './App';

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

const app = (
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
