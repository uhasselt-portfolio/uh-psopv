import {Request, Response} from "express";
import UserModel from "../models/user.model";
import ProblemModel from "../models/problem.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PlanningModel from "../models/planning.model";
import ProblemTypeModel from "../models/problem_type.model";
import ItemModel from "../models/item.model";
import ItemTypeModel from "../models/item_type.model";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const items = await ItemModel.findAll();
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


export const fetch = async (req: Request, res: Response) => {
    const itemID = req.params.id;

    try {
        const item = await ItemModel.findByPk(itemID);
        const statusCode = item == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                item: item
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
        const planningExists : PlanningModel | null = await PlanningModel.findByPk(req.body.planning_id);
        const itemTypeExists : ItemTypeModel | null = await ItemTypeModel.findByPk(req.body.item_type_id);

        if(planningExists && itemTypeExists) {
            const item = await ItemModel.create({
                planning_id: req.body.planning_id,
                item_type_id: req.body.item_type_id
            });

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
