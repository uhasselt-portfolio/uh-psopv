import * as express from 'express';
import {fetchAll, add, authenticate, modify, remove, fetch, isUserOnPost, toggleUserConnection, fetchByPhoneNumber} from '../controllers/user.controller';
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

router.get('/fetch/phone/:phone_number', fetchByPhoneNumber);

router.get('/on-post/:id', isUserOnPost);

router.post('/add', validateBodyParameters('user/add'), add);

router.post('/authenticate', validateBodyParameters('user/authenticate'), authenticate);

router.patch('/modify/:id', modify);

router.patch('/toggle-connection/:id', toggleUserConnection);

router.delete('/delete/:id', verify, remove);

export default router;