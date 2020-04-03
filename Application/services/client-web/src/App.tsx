import React from 'react';
import NavBar from './Components/NavBars/navBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Overview from './Components/Tabs/overview';
import Data from './Components/Tabs/data';
import Rapportering from './Components/Tabs/rapportering'
import Users from './Components/Tabs/users';
import Posts from './Components/Tabs/posts';
import Problems from './Components/Tabs/pukkelpopProblems';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={Overview} />
          <Route path='/Rapportering' component={Rapportering} />
          <Route exact path='/Data' component={Data} /> 
          <Route path="/Data/Users" component={Users} />
          <Route path="/Data/Posts" component={Posts} />  
          <Route path="/Data/Problems" component={Problems} />  
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
