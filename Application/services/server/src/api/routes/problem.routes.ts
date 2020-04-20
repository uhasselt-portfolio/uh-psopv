import * as express from "express";
import {add, fetch, fetchAll, modify, remove, fetchUnsolvedProblems} from "../controllers/problem.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetch);

router.get('/fetch/all/unsolved', fetchUnsolvedProblems);

router.post('/add', validateBodyParameters('problem/add'), add);

router.patch('/modify/:id', modify);

router.delete('/delete/:id', remove);

export default router;