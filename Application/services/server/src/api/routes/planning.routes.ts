import * as express from "express";
import {add, fetch, fetchCurrentShift, fetchAll, modify, remove, fetchUser, fetchUsersInShift, fetchPosts} from "../controllers/planning.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

router.get('/fetch/user/:id', fetchUser);

router.get('/fetch/post/:id', fetchPosts);

router.get('/fetch/shift/active', fetchCurrentShift);

router.get('/fetch/user-in-shift/:id', fetchUsersInShift);

router.post('/add', validateBodyParameters('planning/add'), add);

router.patch('/modify/:id', modify);

router.delete('/delete/:id', verify, remove);

export default router;