import * as express from "express";
import {fetchUsersWithUserID, fetchAll, fetchUsersWithSectorID} from "../controllers/sector.controller";

const router = express.Router();

router.get('/fetch/all', fetchAll);

router.get('/fetch/:id', fetchUsersWithSectorID);

router.get('/fetch/user/:id', fetchUsersWithUserID);

export default router;