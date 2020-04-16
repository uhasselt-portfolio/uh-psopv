import * as express from "express";
import {add, fetch, fetchShift, fetchAll, modify, remove} from "../controllers/planning.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

router.get('/fetch/shift/:id', fetchShift);

router.post('/add', validateBodyParameters('planning/add'), add);

router.patch('/modify/:id', modify);

router.delete('/delete/:id', verify, remove);

export default router;