import UserModel from '../models/user.model';
import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import JWTUtil from "../utils/jwt.util";
import AssociationModel from "../models/association.model";
import PlanningModel from "../models/planning.model";
import ShiftModel from "../models/shift.model";
import {Op} from "sequelize";
import PostModel from "../models/post.model";
import {GeolibInputCoordinates} from "geolib/es/types";

const eagerLoadingOptions = {
    include: [{model: UserModel, all: true}]
}

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
        console.log(error)
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

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
    } catch(error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

export const isUserOnPost = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const userExists = await UserModel.findByPk(userID);

        if(!userExists) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'User doesn\'t exist'
            })
        }

        const where = {
            begin: {[Op.lt]: Date.now()},
            end: {[Op.gt]: Date.now()}
        }

        const planning = await PlanningModel.findOne({where: {user_id: userID}, include: [{
            model: ShiftModel, all:true, where: where
        }]});

        if(!planning) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'User isn\'t on the planning'
            })
        }

        const latitude : number = userExists.current_latitude;
        const longitude : number = userExists.current_longitude;
        const userCoords : GeolibInputCoordinates = {latitude, longitude};
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

export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const userExists = await UserModel.findOne({where: {phone_number: req.body.phone_number}});
        const associationExists = await AssociationModel.findByPk(req.body.association_id);

        if(!associationExists) {
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
                permission_type_id: req.body.permission_type_id,
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

export const authenticate = async (req: Request, res: Response) => {

    // Validate provided parameters
    // if (!checkRequiredParameters(req, res)) return;

    try {
        const user: UserModel | null = await UserModel.findOne({where: {email: req.body.email}});

        if (user && await user.validatePassword(req.body.password)) {
            const payload = {user
                // first_name: user.first_name,
                // last_name: user.last_name,
                // phone_number: user.phone_number,
                // email: user.email,
                // permission_type_id: user.permission_type_id.
                // association_id: user.association_id
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