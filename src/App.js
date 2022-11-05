import logo from './logo.svg';
import './App.css';
import { useApp } from './Context/AppContext';
import { AppBar } from './components/AppBar'
import { UniformeView } from './pages/UniformeView';
import { ExponencialView } from './pages/ExponencialView';
import { BernoulliView } from './pages/BernoulliView';
import { PoissonView } from './pages/PoissonView';
import { Home } from './pages/Home';

function App() {

  const {page} = useApp()

  let component 
  switch (page) {
    case "Home":
      component = <Home/>
      break;
    case "Uniforme":
      component = <UniformeView/>
      break;
    case "Exponencial":
      component = <ExponencialView/>
      break;
    case "Bernoulli":
      component = <BernoulliView/>
      break;
    case "Poisson":
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
