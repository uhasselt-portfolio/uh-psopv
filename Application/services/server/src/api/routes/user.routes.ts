import * as express from 'express';
import {fetchAll, add, authenticate, modify, remove, fetch, isUserOnPost, toggleUserConnection, fetchByPhoneNumber} from '../controllers/user.controller';
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetch);

router.get('/fetch/phone/:phone_number', fetchByPhoneNumber);

router.get('/on-post/:id', verify, isUserOnPost);

router.post('/add', verify, validateBodyParameters('user/add'), add);

router.post('/authenticate', validateBodyParameters('user/authenticate'), authenticate);

router.patch('/modify/:id', verify, modify);

router.patch('/toggle-connection/:id', verify, toggleUserConnection);

router.delete('/delete/:id', verify, remove);

export default router;