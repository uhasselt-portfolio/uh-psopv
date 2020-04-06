import React from 'react';
import NavBar from './Components/NavBars/NavBarComp';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Overview from './Components/Tabs/OverviewTab';
import Data from './Components/Tabs/DataTab';
import Rapportering from './Components/Tabs/RapporteringTab'
import Users from './Components/Tabs/UsersTab';
import Posts from './Components/Tabs/PostsTab';
import Problems from './Components/Tabs/ProblemsTab';
import PukkelpopMap from './Components/Tabs/MapTab';

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
          <Route path="/Map" component={PukkelpopMap} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
