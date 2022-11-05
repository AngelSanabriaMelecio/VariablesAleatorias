import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { RandomGenerator } from './components/RandomGenerator';
import { useApp } from './Context/AppContext';
import { AppBar } from './components/AppBar'
import { InversaView } from './pages/InversaView';
import { UniformeView } from './pages/UniformeView';
import { ExponencialView } from './pages/ExponencialView';
import { BernoulliView } from './pages/BernoulliView';
import { PoissonView } from './pages/PoissonView';
import { Home } from './pages/Home';

function App() {

  let component 
  switch (window.location.pathname) {
    case "/home":
      component = <Home/>
      break;
    case "/uniforme":
      component = <UniformeView/>
      break;
    case "/Exponencial":
      component = <ExponencialView/>
      break;
    case "/Bernoulli":
      component = <BernoulliView/>
      break;
    case "/Poisson":
      component = <PoissonView/>
      break;
    default:
      component = <></>
      break;
  }


  return (
    <>
      <AppBar/>
      {component}
    </>

  );
}

export default App;
