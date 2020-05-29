import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PlanningModel from "../models/planning.model";
import ItemModel from "../models/item.model";
import ItemTypeModel from "../models/item_type.model";

/**
 * Item controller
 *
 * @author Michiel Swaanen
 *
 */

/**
 * Fetch/Load all the behind the foreign keys associated with this model
 */
const eagerLoadingOptions = {
    include: [{
        model: ItemModel, all: true,
        include: [{model: ItemTypeModel, all: true}, {model: PlanningModel, all: true}]
    }]
}

/**
 * Fetch all the items from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchAll = async (req: Request, res: Response) => {
    try {
        const items = await ItemModel.findAll(eagerLoadingOptions);
        const statusCode = items == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                items: items
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
 * Fetch a specific item from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetch = async (req: Request, res: Response) => {
    const itemID = req.params.id;

    try {
        const item = await ItemModel.findByPk(itemID, eagerLoadingOptions);
        const statusCode = item == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                item: item
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
 * Fetch all the items for a specific planning
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchItemsViaPlanningID = async (req: Request, res: Response) => {
    const planningID = req.params.id;

    try {
        const items = await ItemModel.findAll({
            where: {planning_id: planningID},
            include: [{
                model: ItemModel, all: true,
                include: [{model: ItemTypeModel, all: true}, {model: PlanningModel, all: true}]
            }]
        });
        const statusCode = items == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                items: items
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
 * Add an item to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const planningExists: PlanningModel | null = await PlanningModel.findByPk(req.body.planning_id, eagerLoadingOptions);
        const itemTypeExists: ItemTypeModel | null = await ItemTypeModel.findByPk(req.body.item_type_id, eagerLoadingOptions);

        if (planningExists && itemTypeExists) {
            const item = await ItemModel.create({
                planning_id: req.body.planning_id,
                item_type_id: req.body.item_type_id
            }, eagerLoadingOptions);

            res.status(201).send({
                status: 'success',
                data: {item: item},
                message: null
            })
        } else {
            res.status(404).send({
                status: 'fail',
                data: {
                    planning_id: planningExists,
                    item_type_id: itemTypeExists
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

/**
 * Toggle the item lost column to true and false (Modification shortcut)
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const toggleItemLost = async (req: Request, res: Response) => {
    try {
        const itemID = req.params.id;

        const item = await ItemModel.findByPk(itemID);

        if (!item) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'The specified ID doesn\'t exist'
            });
        }

        const result = await ItemModel.update({item_lost: !item.item_lost}, {
            returning: true, where: {id: itemID}
        });

        const updatedItem = result[1][0];
        const statusCode = updatedItem == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'Update wasn\'t successful' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {item: updatedItem},
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
 * Modify a specific column for an item
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const modify = async (req: Request, res: Response) => {
    const itemID = req.params.id;
    const item = req.body.item;

    if (!item)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await ItemModel.update(item, {
            returning: true, where: {id: itemID}
        });

        const updatedItem = result[1][0];
        const statusCode = updatedItem == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {item: updatedItem},
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
 * Delete a specific item
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const remove = async (req: Request, res: Response) => {
    const itemID = req.params.id;

    try {
        const deletedItem = await ItemModel.destroy({where: {id: itemID}});
        const statusCode = deletedItem == null ? 404 : 200;
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
