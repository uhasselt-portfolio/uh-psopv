import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import ShiftModel from "../models/shift.model";

/**
 * Shift controller
 *
 * @author Michiel Swaanen
 *
 */

/**
 * Fetch all the shifts from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
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

/**
 * Fetch a specific shift from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
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
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Add an shift to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const shift = await ShiftModel.create({
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

/**
 * Modify a specific column for a shift
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
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

        const updatedShift = result[1][0];
        const statusCode = updatedShift == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {shift: updatedShift},
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
 * Delete a specific shift
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
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
