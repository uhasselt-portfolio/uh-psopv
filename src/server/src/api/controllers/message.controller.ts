import {Request, Response} from "express";
import UserModel from "../models/user.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";

import MessageModel from "../models/message.model";

/**
 * Message controller
 *
 * @author Michiel Swaanen
 *
 */

/**
 * Fetch/Load all the behind the foreign keys associated with this model
 */
const eagerLoadingOptions = {
    include: [{
        model: MessageModel, all: true,
        include: [{model: UserModel, all: true, as: 'created_by'}, {model: UserModel, all: true, as: 'send_to'}]
    }]
}

/**
 * Fetch all the messages from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchAll = async (req: Request, res: Response) => {
    try {
        const messages = await MessageModel.findAll(eagerLoadingOptions);
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

/**
 * Fetch all the messages that are/were sent to a specific user
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchMessagesSentTo = async (req: Request, res: Response) => {
    const userSendTo = req.params.id;

    try {
        const messages = await MessageModel.findAll({
            where: {send_to_id: userSendTo}, include: [{
                model: MessageModel, all: true,
                include: [{
                    model: MessageModel, all: true,
                    include: [{model: UserModel, all: true, as: 'created_by'}, {
                        model: UserModel,
                        all: true,
                        as: 'send_to'
                    }]
                }]
            }]
        });
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
}

/**
 * Fetch a specific message from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetch = async (req: Request, res: Response) => {
    const messageID = req.params.id;

    try {
        const message = await MessageModel.findByPk(messageID, eagerLoadingOptions);
        const statusCode = message == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                message: message
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
 * Add an message to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const createdByUserExists: UserModel | null = await UserModel.findByPk(req.body.created_by_id);
        const sendToUserExists: UserModel | null = await UserModel.findByPk(req.body.send_to_id);

        if (createdByUserExists && sendToUserExists) {
            const message = await MessageModel.create({
                title: req.body.title,
                message: req.body.message,
                created_by_id: req.body.created_by_id,
                send_to_id: req.body.send_to_id,
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
                    created_by: createdByUserExists,
                    send_to: sendToUserExists,
                },
                message: 'A user doesn\'t exist with that ID'
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
 * Add multiples messages to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const addBulk = async (req: Request, res: Response) => {
    if (!checkRequiredParameters(req, res)) return;

    try {
        const createdByUserExists: UserModel | null = await UserModel.findByPk(req.body.created_by_id);

        if (!createdByUserExists) {
            res.status(404).send({
                status: 'fail',
                data: {
                    created_by: createdByUserExists,
                },
                message: 'User doesn\'t exist with that ID'
            });
        }

        for (let send_to_id of req.body.send_to_ids) {
            const sendToUserExists: UserModel | null = await UserModel.findByPk(send_to_id);

            if (sendToUserExists) {
                await MessageModel.create({
                    title: req.body.title,
                    message: req.body.message,
                    created_by_id: req.body.created_by_id,
                    send_to_id: send_to_id,
                    priority: req.body.priority
                });
            }

        }

        res.status(201).send({
            status: 'success',
            data: null,
            message: null
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
}

/**
 * Toggle the message seen column to true and false (Modification shortcut)
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const toggleSeen = async (req: Request, res: Response) => {
    const messageID = req.params.id

    const message = await MessageModel.findByPk(messageID);

    if (!message) {
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Message doesn\'t exist'
        });
    }

    try {
        const result = await MessageModel.update({seen: !message.seen}, {
            returning: true, where: {id: messageID}
        });

        const updatedMessage = result[1][0];
        const statusCode = updatedMessage == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {message: updatedMessage},
            message: ''
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
 * Modify a specific column for an item
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const modify = async (req: Request, res: Response) => {
    const messageID = req.params.id;
    const message = req.body.message;

    if (!message)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await MessageModel.update(message, {
            returning: true, where: {id: messageID}
        });

        const updatedMessage = result[1][0];
        const statusCode = updatedMessage == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const errorMessage = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {message: updatedMessage},
            message: errorMessage
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
 * Delete a specific message
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
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
