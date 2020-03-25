import {body, ValidationChain, validationResult} from "express-validator";
import {Request, Response} from "express";

export const validateBodyParameters = (method: string): any => {
    switch (method) {
        case 'user/add': {
            return[
                body('email', 'Invalid email format').exists().isEmail().normalizeEmail(),
                body('password', 'Password must have at least 5 characters').exists().isLength({min: 5}),
                body(['first_name', 'last_name'], 'Required parameter').exists(),
                body(['permissions', 'association_id'], 'Parameter must be numeric').exists().isNumeric(),
                body('phone_number', 'Invalid phone number').exists().isMobilePhone("any"),
            ]
        }
        case 'user/authenticate' : {
            return[
                body('phone_number', 'Invalid phone number').exists().isMobilePhone("any"),
                body('password', 'Required parameter').exists()
            ]
        }
    }
};

export const checkRequiredParameters = (req: Request, res: Response) => {
    const errors = validationResult(req);
    const noErrors = errors.isEmpty();

    if(!noErrors) {
        res.status(404).send({
            status: 'fail',
            data: errors,
            message: 'Required parameters not provided'
        });
    }

    return noErrors;
}