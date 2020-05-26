import * as express from "express";
import {add, fetch, fetchAll, modify, remove, fetchUnsolvedProblems, fetchProblemsViaUserID, fetchProblemsViaPlanningID, toggleProblemSolve, reportUser} from "../controllers/problem.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetch);

router.get('/fetch/planning/:id', verify, fetchProblemsViaPlanningID);

router.get('/fetch/user/:id', verify, fetchProblemsViaUserID);

router.get('/fetch/all/unsolved', verify, fetchUnsolvedProblems);

router.post('/add', verify, validateBodyParameters('problem/add'), add);

router.post('/add/report-user/:id', verify, reportUser);

router.patch('/modify/:id', verify, modify);

router.patch('/toggle-solve/:id', verify, toggleProblemSolve);

router.delete('/delete/:id', verify, remove);

export default router;