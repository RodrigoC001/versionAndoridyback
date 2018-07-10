import React from 'react';
import logo from 'Assets/devLogo.png';
import { test } from './Prueba.styl';

export default props => (
  <div className={test}>Hola
    <img src={logo} alt="prueba" />
    <div>
      {props.value}
      ---
      Vamos
    </div>
  </div>);
