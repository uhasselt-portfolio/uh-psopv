import * as express from "express";
import {fetchUsersWithUserID, fetchAll, fetchUsersWithSectorID} from "../controllers/sector.controller";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();

router.get('/fetch/all', verify, fetchAll);

router.get('/fetch/:id', verify, fetchUsersWithSectorID);

router.get('/fetch/user/:id', verify, fetchUsersWithUserID);

export default router;