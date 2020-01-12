import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';
import 'typeface-poppins';

import { Routes } from './router';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
`;

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
ReactDOM.render(
  <AppContainer>
    <div>
      <GlobalStyle />
      <Routes />
    </div>
  </AppContainer>,
  mainElement
);
