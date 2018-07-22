import * as React from 'react';
import {
  render,
} from 'react-dom';
import {
  Provider,
} from 'react-redux';
import {
  createStore,
} from 'redux';
import reducer from './modules';
import routes from './route';

export default render((
  <Provider store={createStore(reducer)}>
    {routes}
  </Provider>
), document.getElementById('app'));
