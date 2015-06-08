import React from 'react';
import App from './App';

import page from 'page';

window.addEventListener('load', () => {
  page('/', () => {
    React.render(
      <App />
    , document.getElementById('main'));
  });

  page.start();
});