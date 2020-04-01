import UserModel from '../models/user.model';
import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import JWTUtil from "../utils/jwt.util";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        const status = users == null ? 404 : 200;

        res.status(status).send({
            status: 'success',
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

export const fetch = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const user = await UserModel.findByPk(userID);
        const status = user == null ? 404 : 200;

        res.status(status).send({
            status: 'success',
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

export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const userExists = await UserModel.findOne({where: {phone_number: req.body.phone_number}});

        if (!userExists) {
            const user = await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: req.body.password,
                phone_number: req.body.phone_number,
                email: req.body.email,
                permissions: req.body.permissions,
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
    const modifiedUser = req.body.user;

    if (!modifiedUser)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {

        const updatedUser = await UserModel.update(modifiedUser, {
            returning: true, where: {id: userID}
        });

        const user = updatedUser[1][0];
        const statusCode = user == null ? 404 : 200;
        const statusMessage = user == null ? 'fail' : 'success';

        res.status(statusCode).send({
            status: statusMessage,
            data: {user: user},
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

export const remove = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const user = await UserModel.destroy({where: {id: userID}});
        const statusCode = user === null ? 404 : 200;
        const statusMessage = user === null ? 'fail' : 'success';

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
    if (!checkRequiredParameters(req, res)) return;

    const user: UserModel | null = await UserModel.findOne({where: {phone_number: req.body.phone_number}});

    if (user && await user.validatePassword(req.body.password)) {
        const payload = {
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            email: user.email,
            permissions: user.permissions,
            association_id: user.association_id
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
};