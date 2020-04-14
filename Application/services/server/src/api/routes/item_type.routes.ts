import * as express from "express";
import {add, fetch, fetchAll, modify, remove} from "../controllers/item_type.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

router.post('/add', validateBodyParameters('item_type/add'), add);

router.patch('/modify/:id', modify);

router.delete('/delete/:id', verify, remove);

export default router;