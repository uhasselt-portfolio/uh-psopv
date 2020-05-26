import multer from "multer"
import * as express from "express";
import {importUsers} from "../controllers/import.controller";
import {verify} from "../middleware/jwt.middleware";

const router = express.Router();
const storage = multer.memoryStorage();
const fileHandler = multer({storage: storage});

router.post('/user', verify, importUsers);

export default router;