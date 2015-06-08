import 'babel/polyfill';

import React from 'react';
import App from './App';

import page from 'page';

import qs from 'qs';

window.addEventListener('load', () => {
  let initialized = false;

  page('*', (ctx, next) => {
    if (initialized) {
      return;
    }
    
    initialized = true;

    let query = qs.parse(location.search.slice(1));
    query = Object.keys(query).reduce((result, propName) => {
      result[propName] = JSON.parse(query[propName]);
      return result;
    }, {});

    React.render(
      <App {...query} />
    , document.getElementById('main'));
  });

  page.base(process.env.BASEPATH || '');

  page.start();
});