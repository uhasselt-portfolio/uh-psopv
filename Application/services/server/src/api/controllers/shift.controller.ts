import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import ShiftModel from "../models/shift.model";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const shifts = await ShiftModel.findAll();
        const statusCode = shifts == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                shifts: shifts
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
    const shiftID = req.params.id;

    try {
        const shift = await ShiftModel.findByPk(shiftID);
        const statusCode = shift == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                shift: shift
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
        const shift = ShiftModel.create({
            name: req.body.name,
            begin: req.body.begin,
            end: req.body.end
        });

        res.status(201).send({
            status: 'success',
            data: {shift: shift},
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

export const modify = async (req: Request, res: Response) => {
    const shiftID = req.params.id;
    const shift = req.body.shift;

    if (!shift)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await ShiftModel.update(shift, {
            returning: true, where: {id: shiftID}
        });

        // TODO: Checking if result is not empty --> index out of range
        const updatedShift = result[1][0];
        const statusCode = updatedShift == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {shift: updatedShift},
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
    const shiftID = req.params.id;

    try {
        const deletedShift = await ShiftModel.destroy({where: {id: shiftID}});
        const statusCode = deletedShift == null ? 404 : 200;
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
