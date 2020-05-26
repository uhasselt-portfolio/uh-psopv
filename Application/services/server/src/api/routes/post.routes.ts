import * as express from "express";
import {add, fetch, fetchAll, modify, remove} from "../controllers/post.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetch);

router.post('/add', verify, validateBodyParameters('post/add'), add);

router.patch('/modify/:id', verify, modify);

router.delete('/delete/:id', verify, remove);

export default router;