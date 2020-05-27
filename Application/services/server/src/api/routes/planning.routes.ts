import * as express from "express";
import {add, fetch, fetchCurrentShift, fetchAll, modify, remove, fetchFuturePlanningsByUserID,
    fetchUsersInSameShiftAndPost, fetchPosts, toggleCheckedIn, fetchActivePlaningViaUserID} from "../controllers/planning.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetch);

// Find all the future plannings that contains user with id ...
router.get('/fetch/user/:id', verify, fetchFuturePlanningsByUserID);

// Find all the plannings with that contains post with id ...
router.get('/fetch/post/:id', verify, fetchPosts);

// Find all the plannings that have currently an active shift
router.get('/fetch/shift/active', verify, fetchCurrentShift);

// Find a planning for a specific in case it's active
router.get('/fetch/user/active/:id', verify, fetchActivePlaningViaUserID)

// Find all the users that are currently working in shift ...
router.get('/fetch/users/:post_id/:shift_id', verify, fetchUsersInSameShiftAndPost);

router.post('/add', verify, validateBodyParameters('planning/add'), add);

router.patch('/modify/:id', verify, modify);

router.patch('/toggle-checkin/:id', verify, toggleCheckedIn)

router.delete('/delete/:id', verify, remove);

export default router;