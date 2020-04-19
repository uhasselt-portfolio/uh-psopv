import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/login/LoginPage';
import InfoPage from './pages/info/InfoPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { ellipse, square, triangle } from 'ionicons/icons';
import store from './reducers';
import {Provider} from 'react-redux';



/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <Provider store={store}>
  <IonApp>
      <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/infopage" component={InfoPage} exact={true} />
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/" render={() => <Redirect to="/infopage" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        <IonTabButton tab="Login" href="/Login">
            <IonIcon icon={square} />
            <IonLabel>Login</IonLabel>
          </IonTabButton>
          <IonTabButton tab="infopage" href="/infopage">
            <IonIcon icon={ellipse} />
            <IonLabel>InfoPage</IonLabel>
          </IonTabButton>
        </IonTabBar>
        </IonTabs>
      </IonReactRouter>
  </IonApp>
  </Provider>

);

export default App;
