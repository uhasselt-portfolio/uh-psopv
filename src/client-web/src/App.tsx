import React from 'react';
import NavBar from './navBars/NavBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ProblemDetails from './pages/detailpages/ProblemDetails';
import PostDetails from './pages/detailpages/PostDetails';
import Problems from './pages/problem/ProblemPage';

import Planning from './pages/planning/PlanningPage';
import PukkelpopMap from './pages/map/MapPage';
import Posts from './pages/post/PostPage';
import Users from './pages/user/UserPage';
import Data from './pages/data/DataPage';
import Overview from './pages/overview/OverviewPage';

import {Provider} from 'react-redux';
import {store} from './Redux/store';
import {Grid} from '@material-ui/core';

const appStyle = {
    background: '#eee',
    minheight: '100vh',
    height: '100%',
    paddingBottom: '5px'
}

//TODO op veel plekken nog loading and failed messages maken

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Grid className="App" style={appStyle}>
          <Grid>
          <NavBar />
          </Grid>
          <Grid>
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
          </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Provider>
  );
}

export default App;