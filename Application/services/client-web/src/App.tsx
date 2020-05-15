import React from 'react';
import NavBar from './navBars/NavBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProblemDetails from './pages/detailpages/ProblemDetails';
import PostDetails from './pages/detailpages/PostDetails';
import Problems from './pages/problem/ProblemPage';

import Planning from './pages/planning/PlanningPage';
import Settings from './pages/settings/SettingsPage';
import PukkelpopMap from './pages/map/MapPage';
import Posts from './pages/post/PostPage';
import Users from './pages/user/UserPage';
import Data from './pages/data/DataPage';
import Overview from './pages/overview/OverviewPage';

import {Provider} from 'react-redux';
import {store} from './Redux/store';

const appStyle = {
  background: 'rgb(232, 232, 232)',
  minheight: '100vh',
  height: '100%',
  paddingBottom: '5px'
}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App" style={appStyle}>
          <NavBar />
          <Switch>
            <Route exact path='/' component={Overview} />
            <Route exact path='/Data' component={Data} /> 
            <Route path="/Data/Users" component={Users} />
            <Route path="/Data/Posts" component={Posts} />  
            <Route path="/Data/Problems" component={Problems} />  
            <Route path="/Map" component={PukkelpopMap} />
            <Route path="/Data/Problem" component={ProblemDetails} />
            <Route path="/Data/Post" component={PostDetails} />
            <Route path="/Data/Shifts" component={Planning} />
            <Route path="/Settings" component={Settings} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
