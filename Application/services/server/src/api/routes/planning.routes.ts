import * as express from "express";
import {add, fetch, fetchCurrentShift, fetchAll, modify, remove, fetchUser, fetchUsersInSameShiftAndPost, fetchPosts} from "../controllers/planning.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

// Find all the plannings with that contains user with id ...
router.get('/fetch/user/:id', fetchUser);

// Find all the plannings with that contains post with id ...
router.get('/fetch/post/:id', fetchPosts);

// Find all the plannings that are currently active
router.get('/fetch/shift/active', fetchCurrentShift);

// Find all the users that are currently working in shift ...
router.get('/fetch/users/:post_id/:shift_id', fetchUsersInSameShiftAndPost);

router.post('/add', validateBodyParameters('planning/add'), add);

router.patch('/modify/:id', modify);

router.delete('/delete/:id', verify, remove);

export default router;