import * as express from "express";
import {add, fetch, fetchAll, modify, remove, toggleSeen, fetchMessagesSendTo} from "../controllers/message.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

// TODO: Add middleware back
router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

// Fetch all the messages where send_to id is ...
router.get('/fetch/send-to/:id', fetchMessagesSendTo);

router.post('/add', validateBodyParameters('message/add'), add);

router.patch('/modify/:id', modify);

router.patch('/toggle-seen/:id', toggleSeen);

router.delete('/delete/:id', verify, remove);

export default router;