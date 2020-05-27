import * as express from "express";
import {
    fetchAll,
    fetchSectorManagerWithUserID,
    fetchUsersWithSectorID,
    fetchUsersWithUserID
} from "../controllers/sector.controller";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetchUsersWithSectorID);

router.get('/fetch/user/:id', verify, fetchUsersWithUserID);

router.get('/fetch/sector-manager/:id', fetchSectorManagerWithUserID)

export default router;