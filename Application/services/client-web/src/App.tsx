import React from 'react';
import NavBar from './navBars/NavBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProblemDetails from './pages/detailpages/ProblemDetails';
import PostDetails from './pages/detailpages/PostDetails';
import UserDetails from './pages/detailpages/UserDetails';
import Problems from './pages/problem/ProblemPage';

import Planning from './pages/planning/PlanningPage';
import Settings from './pages/settings/SettingsPage';
import PukkelpopMap from './pages/map/MapPage';
import Posts from './pages/post/PostPage';
import Users from './pages/user/UserPage';
import Rapportering from './pages/rapportering/Rappoteringpage';
import Data from './pages/data/DataPage';
import Overview from './pages/overview/OverviewPage';

import {Provider} from 'react-redux';
import {store} from './Redux/store';

// const customTheme = {
//   palette: { 
//     primary1Color:'#3f51b5',
//     primary2Color: '#00bcd4',
//     primary3Color: "#2196f3"
//   }
// };
const appStyle = {
  background: 'rgb(232, 232, 232)',
  minheight: '100vh',
  height: '100%'
}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App" style={appStyle}>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Overview} />
            <Route path='/Rapportering' component={Rapportering} />
            <Route exact path='/Data' component={Data} /> 
            <Route path="/Data/Users" component={Users} />
            <Route path="/Data/Posts" component={Posts} />  
            <Route path="/Data/Problems" component={Problems} />  
            <Route path="/Map" component={PukkelpopMap} />
            <Route path="/Data/Problem" component={ProblemDetails} />
            <Route path="/Data/Post" component={PostDetails} />
            <Route path="/Data/User" component={UserDetails} />
            <Route path="/Data/Shifts" component={Planning} />
            <Route path="/Settings" component={Settings} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
