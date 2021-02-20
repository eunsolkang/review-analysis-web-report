import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Analysis from './components/Analysis';

function App() {
    const filter = "win16|win32|win64|macintel|macm1";
    if ( navigator.platform ){
        if(0 > filter.indexOf(navigator.platform.toLowerCase())){
            return (
                <div>
                    Not available on mobile. Please connect with computer
                </div>
            )
        }
    }
  return (
      <Switch>
        <Route exact component={Analysis} path='/'></Route>
      </Switch>
  );
}

export default App;
