import * as express from "express";
import {
    add,
    addBulk,
    fetch,
    fetchAll,
    fetchMessagesSendTo,
    modify,
    remove,
    toggleSeen
} from "../controllers/message.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

/**
 * Message routes
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

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetch);

// Fetch all the messages where send_to id is ...
router.get('/fetch/send-to/:id', verify, fetchMessagesSendTo);

router.post('/add', verify, validateBodyParameters('message/add'), add);

router.post('/add/bulk', verify, validateBodyParameters('message/add/bulk'), addBulk);

router.patch('/modify/:id', verify, modify);

// Toggle seen
router.patch('/toggle-seen/:id', verify, toggleSeen);

router.delete('/delete/:id', verify, remove);

export default router;