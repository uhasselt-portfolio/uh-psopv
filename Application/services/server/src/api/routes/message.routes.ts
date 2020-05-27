import * as express from "express";
import {add, fetch, fetchAll, modify, remove, toggleSeen, fetchMessagesSendTo} from "../controllers/message.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetch);

// Fetch all the messages where send_to id is ...
router.get('/fetch/send-to/:id', verify, fetchMessagesSendTo);

router.post('/add', verify, validateBodyParameters('message/add'), add);

router.patch('/modify/:id', verify, modify);

// Toggle seen
router.patch('/toggle-seen/:id', verify, toggleSeen);

router.delete('/delete/:id', verify, remove);

export default router;