import * as express from 'express';
import {fetchAll, add, authenticate, modify, remove, fetch, isUserOnPost} from '../controllers/user.controller';
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

router.get('/on-post/:id', isUserOnPost);

router.post('/add', validateBodyParameters('user/add'), add);

router.post('/authenticate', validateBodyParameters('user/authenticate'), authenticate);

router.patch('/modify/:id', modify);

router.delete('/delete/:id', verify, remove);

export default router;