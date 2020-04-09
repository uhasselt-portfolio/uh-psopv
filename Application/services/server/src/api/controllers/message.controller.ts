import {Request, Response} from "express";
import UserModel from "../models/user.model";
import ProblemModel from "../models/problem.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PlanningModel from "../models/planning.model";
import ProblemTypeModel from "../models/problem_type.model";
import ItemModel from "../models/item.model";
import ItemTypeModel from "../models/item_type.model";
import MessageModel from "../models/message.model";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const messages = await MessageModel.findAll();
        const statusCode = messages == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                messages: messages
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
    const messageID = req.params.id;

    try {
        const message = await MessageModel.findByPk(messageID);
        const statusCode = message == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                message: message
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
        const userExists : UserModel | null = await UserModel.findByPk(req.body.created_by);

        if(userExists) {
            const message = MessageModel.create({
                title: req.body.title,
                message: req.body.message,
                created_by: req.body.created_by,
                priority: req.body.priority
            });

            res.status(201).send({
                status: 'success',
                data: {message: message},
                message: null
            })
        } else {
            res.status(404).send({
                status: 'fail',
                data: {
                    user_id: userExists,
                },
                message: 'Make sure that your specified data is correct'
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
    const user = req.body.item;

    if (!user)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await ItemModel.update(user, {
            returning: true, where: {id: userID}
        });

        // TODO: Checking if result is not empty --> index out of range
        const updatedMessage = result[1][0];
        const statusCode = updatedMessage == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {message: updatedMessage},
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
    const messageID = req.params.id;

    try {
        const deletedMessage = await MessageModel.destroy({where: {id: messageID}});
        const statusCode = deletedMessage == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

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
