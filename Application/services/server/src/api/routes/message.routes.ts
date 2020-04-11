import * as express from "express";
import {add, fetch, fetchAll, modify, remove} from "../controllers/message.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

// TODO: Add middleware back
router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', verify, fetch);

router.post('/add', validateBodyParameters('message/add'), add);

router.patch('/modify/:id', verify, modify);

router.delete('/delete/:id', verify, remove);

export default router;