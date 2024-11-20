import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './Css/base/media.css'
// import './Css/Components/form.css'
import './Css/Components/button.css'
import './Css/Components/errors.css'
import './Css/Loading/Loading.css'
import './Css/Components/AuthButtonWithGoogle.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from 'react-router-dom';
import MenuContext from './Context/MenuContext';
import WindoeContext from './Context/WindoeContext';
import { CartContext } from './Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MenuContext >
      <WindoeContext>
        <CartContext>
        <Router>
         <App />
        </Router>
        </CartContext>
      </WindoeContext>
    </MenuContext>
    
    
  </React.StrictMode>
);


