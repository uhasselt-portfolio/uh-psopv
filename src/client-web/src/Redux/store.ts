import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxThunk from "redux-thunk"
import ProblemReducer from '../pages/problem/ProblemReducer';
import MapReducer from '../pages/map/MapReducer';
import OverviewReducer from '../pages/overview/OverviewReducer';
import PlanningReducer from '../pages/planning/PlanningReducer';
import PostReducer from '../pages/post/PostReducer';
import UsersReducer from '../pages/user/UserReducer';
import ComponentReducer from '../Components/ComponentReducers';
import PdfReducer from '../navBars/PDFGeneration/PDFReducer';
import DetailReducer from '../pages/detailpages/DetailReducer';
import DataReducer from '../pages/data/DataReducer';

const rootReducer = combineReducers( {
    MapReducer, OverviewReducer, PlanningReducer, PostReducer, DetailReducer,
    ProblemReducer, UsersReducer, ComponentReducer, PdfReducer, DataReducer
});
export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk)
    );
