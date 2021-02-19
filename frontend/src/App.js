import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Analysis from './components/Analysis';

function App() {
  return (
      <Switch>
        <Route exact component={Analysis} path='/'></Route>
      </Switch>
  );
}

export default App;
