import UserModel from '../models/user.model';
import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import JWTUtil from "../utils/jwt.util";
import AssociationModel from "../models/association.model";
import PlanningModel from "../models/planning.model";
import ShiftModel from "../models/shift.model";
import {Op} from "sequelize";
import {GeolibInputCoordinates} from "geolib/es/types";

/**
 * User controller
 *
 * @author Michiel Swaanen
 *
 */

/**
 * Fetch/Load all the behind the foreign keys associated with this model
 */
const eagerLoadingOptions = {
    include: [{model: UserModel, all: true}]
}

/**
 * Fetch all the users from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchAll = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll(eagerLoadingOptions);
        const statusCode = users == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                users: users
            },
            message: null
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Fetch all the users from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchAllConnected = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll({include: [{model: UserModel, all: true}], where: {is_connected: true}});
        const statusCode = users == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                users: users
            },
            message: null
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Fetch a specific user from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetch = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const user = await UserModel.findByPk(userID, eagerLoadingOptions);
        const statusCode = user == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                user: user
            },
            message: null
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Fetch a specific user by its phone number from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchByPhoneNumber = async (req: Request, res: Response) => {
    const phoneNumber = req.params.phone_number;

    try {
        const user = await UserModel.findOne({where: {phone_number: phoneNumber}, include: [{all: true}]});
        const statusCode = user == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                user: user
            },
            message: null
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Check if the user is on its post
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const isUserOnPost = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const userExists = await UserModel.findByPk(userID);

        if (!userExists) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'User doesn\'t exist'
            })
        }

        const where = {
            begin: {[Op.lt]: new Date().getTime()},
            end: {[Op.gt]: new Date().getTime()},
        }

        const planning = await PlanningModel.findOne({
            where: {user_id: userID}, include: [{
                model: ShiftModel, all: true, where: where
            }]
        });

        if (!planning) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'User isn\'t on the planning'
            })
        }

        const latitude: number = userExists.current_latitude;
        const longitude: number = userExists.current_longitude;
        const userCoords: GeolibInputCoordinates = {latitude, longitude};
        const isUserOnPost = planning.post.isUserOnPost(userCoords);
        const statusCode = !isUserOnPost ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                isUserOnPost: isUserOnPost
            },
            message: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
}

/**
 * Add a user to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const userExists = await UserModel.findOne({where: {phone_number: req.body.phone_number}});
        const associationExists = await AssociationModel.findByPk(req.body.association_id);

        if (!associationExists) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'Association doesn\'t exist'
            })
        }

        if (!userExists) {
            const user = await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password,
                phone_number: req.body.phone_number,
                email: req.body.email,
                // permission_type_id: req.body.permission_type_id,
                association_id: req.body.association_id
            });

            res.status(201).send({
                status: 'success',
                data: {user: user},
                message: null
            });
        } else {
            res.status(404).send({
                status: 'fail',
                data: null,
                message: 'Phone number already in use'
            });
        }

    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Modify a specific column for a user
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const modify = async (req: Request, res: Response) => {
    const userID = req.params.id;
    const user = req.body.user;

    if (!user)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await UserModel.update(user, {
            returning: true, where: {id: userID}
        });

        const updatedUser = result[1][0];
        const statusCode = updatedUser == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {user: updatedUser},
            message: message
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Toggle user connection column to true and false (Modification shortcut)
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const toggleUserConnection = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const user = await UserModel.findByPk(userID);

        if (!user) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'The specified ID doesn\'t exist'
            });
        }

        const result = await UserModel.update({is_connected: !user.is_connected}, {
            returning: true, where: {id: userID}
        });

        const updatedUser = result[1][0];
        const statusCode = updatedUser == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'Update wasn\'t successful' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {user: updatedUser},
            message: message
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
}

/**
 * Delete a specific user
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const remove = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const user = await UserModel.destroy({where: {id: userID}});
        const statusCode = user === null ? 404 : 200;
        const statusMessage = statusCode === 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: null,
            message: null
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Authenticate a specific user
 * Authentication happens using e-mail for possible application expandability and flexibility
 * Sends back a JWT
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const authenticate = async (req: Request, res: Response) => {

    try {
        const user: UserModel | null = await UserModel.findOne({where: {email: req.body.email}});

        if (user && await user.validatePassword(req.body.password)) {
            const payload = {
                user
            };

            res.status(200).send({
                status: 'success',
                data: {jwt: new JWTUtil().sign(payload)},
                message: null
            });
        } else {
            res.status(404).send({
                status: 'fail',
                data: null,
                message: 'Wrong login credentials specified'
            });
        }
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};