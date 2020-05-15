import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxThunk from "redux-thunk"
import ProblemReducer from '../pages/problem/ProblemReducer';
import MapReducer from '../pages/map/MapReducer';
import OverviewReducer from '../pages/overview/OverviewReducer';
import PlanningReducer from '../pages/planning/PlanningReducer';
import PostReducer from '../pages/post/PostReducer';
import SettingsReducer from '../pages/settings/SettingsReducer';
import UsersReducer from '../pages/user/UserReducer';
import ComponentReducer from '../Components/ComponentReducers';
import PdfReducer from '../navBars/PDFGeneration/PDFReducer';
import DetailReducer from '../pages/detailpages/DetailReducer';

const rootReducer = combineReducers( {
    MapReducer, OverviewReducer, PlanningReducer, PostReducer, DetailReducer,
    ProblemReducer, SettingsReducer, UsersReducer, ComponentReducer, PdfReducer
});
export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
    );

