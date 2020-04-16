import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxThunk from "redux-thunk"
import ProblemReducer from '../pages/problem/ProblemReducer';
import MapReducer from '../pages/map/MapReducer';
import OverviewReducer from '../pages/overview/OverviewReducer';
import PlanningReducer from '../pages/planning/PlanningReducer';
import PostReducer from '../pages/post/PostReducer';
import RapporeringReducer from '../pages/rapportering/RapporteringReducer';
import SettingsReducer from '../pages/settings/SettingsReducer';
import UsersReducer from '../pages/user/UserReducer';
import ComponentReducer from '../Components/ComponentReducers';

const rootReducer = combineReducers( {
    MapReducer, OverviewReducer, PlanningReducer, PostReducer, 
    ProblemReducer, RapporeringReducer, SettingsReducer, UsersReducer, ComponentReducer
});
export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
    );

