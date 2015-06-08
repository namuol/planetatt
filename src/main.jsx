import 'babel/polyfill';

import React from 'react';
import App from './App';

import page from 'page';

import qs from 'qs';
window.qs = qs;

window.addEventListener('load', () => {
  let initialized = false;

  page.base(process.env.BASEPATH);

  page('*', (ctx, next) => {
    if (initialized) {
      return;
    }
    
    ctx.query = qs.parse(location.search.slice(1));
    ctx.query = Object.keys(ctx.query).reduce((result, propName) => {
      result[propName] = JSON.parse(ctx.query[propName]);
      return result;
    }, {});

    next();
  });

  page('/', (ctx) => {
    if (initialized) {
      return;
    }

    initialized = true;

    React.render(
      <App {...ctx.query} />
    , document.getElementById('main'));
  });

  page.start();
});