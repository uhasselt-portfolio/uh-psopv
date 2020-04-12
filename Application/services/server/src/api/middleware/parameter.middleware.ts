import {body, ValidationChain, validationResult} from "express-validator";
import {Request, Response} from "express";

export const validateBodyParameters = (method: string): any => {
    switch (method) {
        case 'user/add': {
            return [
                body('email', 'Invalid email format').exists().isEmail().normalizeEmail(),
                body('password', 'Password must have at least 5 characters').exists().isLength({min: 5}),
                body(['first_name', 'last_name'], 'Required parameter').exists(),
                body(['permissions', 'association_id'], 'Parameter must be numeric').exists().isNumeric(),
                body('phone_number', 'Invalid phone number').exists().isMobilePhone("any"),
            ]
        }
        case 'user/authenticate' : {
            return [
                body('email', 'Invalid email format').exists().isEmail(),
                body('password', 'Required parameter').exists()
            ]
        }
        case 'problem/add': {
            return [
                body("planning_id", "You must specify a planning").exists().isNumeric(),
                body("problem_type_id", "You must specify a problem type").exists().isNumeric(),
                body("created_by_id", "You must specify the user that sent the problem").exists().isNumeric(),
            ]
        }
        case 'post/add': {
            return [
                body("title", "You must specify the title for the post").exists(),
                body("address", "You must specify an address/street name for the post").exists(),
                body(["latitude", "longitude"], "You must specify the latitude and longitude and it must be numeric").exists().isNumeric(),
                body("radius", "You must specify the radius of the post").exists(),
                body("sector", "You must specify the sector of the post").exists(),
            ]
        }
        case 'shift/add': {
            return [
                body("name", "You must specify a name for a shift").exists(),
                body(["begin", "end"], "You must specify a begin and ending for a shift").exists()
            ]
        }
        case 'item/add': {
            return [
                body("planning_id", "You must specify a planning").exists().isNumeric(),
                body("item_type_id", "You must specify an item type").exists().isNumeric(),
            ]
        }
        case 'message/add': {
            return [
                body("title", "You must specify a title for the message").exists(),
                body("message", "You must specify a message").exists(),
                body("created_by_id", "You must specify the user that sent the message").exists().isNumeric(),
                body("priority", "You must specify the priority of the message").exists().isNumeric(),
            ]
        }
        case 'association/add': {
            return [
                body("name", "You must specify a name for the association").exists()
            ]
        }
        case 'general_post/add': {
            return [
                body("name", "You must specify a name for the general post").exists(),
                body("minimumAge", "You must specify a minimum age for the general post").exists(),
                body("description", "You must specify a description for the general post").exists()
            ]
        }
        case 'problem_type/add': {
            return [
                body("title", "You must specify a title for the problem type").exists(),
                body("priority", "You must specify a priority for the problem type").exists().isNumeric(),
                body("description", "You must specify a description for the problem type").exists(),
            ]
        }
        case 'item_type/add': {
            return [
                body("name", "You must specify a name for the item type").exists(),
            ]
        }
        case 'planning/add': {
            return [
                body("user_id", "You must specify an user_id for the planning").exists().isNumeric(),
                body("shift_id", "You must specify a shift_id for the planning").exists().isNumeric(),
                body("post_id", "You must specify a post_id for the planning").exists().isNumeric(),
            ]
        }
    }
};

export const checkRequiredParameters = (req: Request, res: Response) => {
    const errors = validationResult(req);
    const noErrors = errors.isEmpty();

    if(!noErrors) {
        res.status(200).send({
            status: 'fail',
            data: errors,
            message: 'Required parameters not provided'
        });
    }

    return noErrors;
}