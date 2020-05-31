import * as express from "express";
import {
    add,
    fetch,
    fetchAll,
    fetchProblemsViaPlanningID,
    fetchProblemsViaUserID,
    fetchUnsolvedProblems,
    modify,
    remove,
    reportUser,
    toggleProblemSolve
} from "../controllers/problem.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";
import {verify} from "../middleware/jwt.middleware";

/**
 * Problem routes
 * @author Michiel Swaanen
 *
 * Only use GET, POST, PATCH or DELETE
 *
 * @param path Specify the child route
 *
 * @param middleware
 *
 *   We have 2 types of middleware:
 *   - verify                   >> Checks if the request contains a valid JWT
 *   - validateBodyParameters   >> Checks if the right body parameters are provided (Only needed for POST requests)
 *
 * @param controller Contains the functionality of the route
 */
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