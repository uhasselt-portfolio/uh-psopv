import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import ItemTypeModel from "../models/item_type.model";

/**
 * Item Type controller
 *
 * @author Michiel Swaanen
 *
 */

/**
 * Fetch all the item types from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchAll = async (req: Request, res: Response) => {
    try {
        const itemTypes = await ItemTypeModel.findAll();
        const statusCode = itemTypes == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                itemTypes: itemTypes
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
 * Fetch a specific item type from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetch = async (req: Request, res: Response) => {
    const itemTypeID = req.params.id;

    try {
        const itemType = await ItemTypeModel.findByPk(itemTypeID);
        const statusCode = itemType == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                itemType: itemType
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
 * Add an item type to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const itemType = await ItemTypeModel.create({
            name: req.body.name
        });

        res.status(201).send({
            status: 'success',
            data: {itemType: itemType},
            message: null
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Modify a specific column for an item type
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const modify = async (req: Request, res: Response) => {
    const itemTypeID = req.params.id;
    const itemType = req.body.itemType;

    if (!itemType)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await ItemTypeModel.update(itemType, {
            returning: true, where: {id: itemTypeID}
        });

        const updatedItemType = result[1][0];
        const statusCode = updatedItemType == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {itemType: updatedItemType},
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
 * Delete a specific item type
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const remove = async (req: Request, res: Response) => {
    const itemTypeID = req.params.id;

    try {
        const deletedItemType = await ItemTypeModel.destroy({where: {id: itemTypeID}});
        const statusCode = deletedItemType == null ? 404 : 200;
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
