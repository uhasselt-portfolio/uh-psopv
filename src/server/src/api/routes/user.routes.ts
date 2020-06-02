import * as express from 'express';
import {
    add,
    authenticate,
    fetch,
    fetchAll,
    fetchByPhoneNumber,
    isUserOnPost,
    modify,
    remove,
    toggleUserConnection,
    fetchAllConnected
} from '../controllers/user.controller';
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";


/**
 * User routes
 * @author Michiel Swaanen
 *
 * Only use GET, POST, PATCH or DELETE
 *
 * @param path Specify the child route
 *
 * @param middleware
 *
 *   We have 2 types of middleware:
 *   - verify                   >> Checks if the request contains a valid JWT
 *   - validateBodyParameters   >> Checks if the right body parameters are provided (Only needed for POST requests)
 *
 * @param controller Contains the functionality of the route
 */
const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/all/connected', fetchAllConnected);

router.get('/fetch/:id', verify, fetch);

router.get('/fetch/phone/:phone_number', fetchByPhoneNumber);

router.get('/on-post/:id', verify, isUserOnPost);

router.post('/add', verify, validateBodyParameters('user/add'), add);

router.post('/authenticate', validateBodyParameters('user/authenticate'), authenticate);

router.patch('/modify/:id', verify, modify);

router.patch('/toggle-connection/:id', verify, toggleUserConnection);

router.delete('/delete/:id', verify, remove);

export default router;