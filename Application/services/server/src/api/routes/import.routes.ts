import multer from "multer"
import * as express from "express";
import {importGeneralPostAndPost, importItems, importPlanning, importShifts, importUserAndAssociation,deleteAll} from "../controllers/import.controller";
import {validateBodyParameters} from "../middleware/parameter.middleware";

const router = express.Router();
const storage = multer.memoryStorage();
const fileHandler = multer({storage: storage});
//fileHandler.single("excel")
// router.post('/user', importUsers);
// router.post('/all', importAll);

router.post('/createUser',importUserAndAssociation);
router.post('/createGeneralAndPost',importGeneralPostAndPost);
router.post('/createPlanning',importPlanning);
router.post('/createShift',importShifts);
router.post('/createItemType',importItems);
router.post('/deleteAll', deleteAll);

export default router;