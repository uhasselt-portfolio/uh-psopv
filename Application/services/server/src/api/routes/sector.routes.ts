import * as express from "express";
import {
    fetchAll,
    fetchSectorManagerWithUserID,
    fetchUsersWithSectorID,
    fetchUsersWithUserID
} from "../controllers/sector.controller";
import {verify} from "../middleware/jwt.middleware";

/**
 * Sector routes
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

router.get('/fetch/:id', verify, fetchUsersWithSectorID);

router.get('/fetch/user/:id', verify, fetchUsersWithUserID);

router.get('/fetch/sector-manager/:id', fetchSectorManagerWithUserID)

export default router;