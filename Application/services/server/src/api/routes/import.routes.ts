import multer from "multer"
import * as express from "express";
import {importUsers} from "../controllers/import.controller";

const router = express.Router();
const storage = multer.memoryStorage();
const fileHandler = multer({storage: storage});

router.post('/user', fileHandler.single("excel"), importUsers);

export default router;