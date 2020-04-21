import * as express from "express";
import {add, fetch, fetchAll, modify, remove, toggleItemLost, fetchItemsViaPlanningID} from "../controllers/item.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

router.get('/fetch/planning/:id', fetchItemsViaPlanningID);

router.post('/add', validateBodyParameters('item/add'), add);

router.patch('/modify/:id', modify);

router.patch('/toggle-lost/:id', toggleItemLost);

router.delete('/delete/:id', verify, remove);

export default router;