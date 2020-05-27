import * as express from "express";
import {
    add,
    fetch,
    fetchAll,
    modify,
    remove,
    toggleItemLost,
    fetchItemsViaPlanningID
} from "../controllers/item.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetch);

router.get('/fetch/planning/:id', verify, fetchItemsViaPlanningID);

router.post('/add', verify, validateBodyParameters('item/add'), add);

router.patch('/modify/:id', verify, modify);

router.patch('/toggle-lost/:id', verify, toggleItemLost);

router.delete('/delete/:id', verify, remove);

export default router;