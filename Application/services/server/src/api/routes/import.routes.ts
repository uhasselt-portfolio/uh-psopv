import multer from "multer"
import * as express from "express";
import {
    deleteAll,
    importGeneralPostAndPost,
    importItems,
    importPlanning,
    importShifts,
    importUserAndAssociation
} from "../controllers/import.controller";

const router = express.Router();
const storage = multer.memoryStorage();
const fileHandler = multer({storage: storage});

/**
 * Post routes
 * @author Wouter Grootjans
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
router.post('/createUser',importUserAndAssociation);

router.post('/createGeneralAndPost',importGeneralPostAndPost);

router.post('/createPlanning',importPlanning);

router.post('/createShift',importShifts);

router.post('/createItemType',importItems);

router.post('/deleteAll', deleteAll);

export default router;