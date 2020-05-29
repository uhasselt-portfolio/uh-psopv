import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import ProblemTypeModel from "../models/problem_type.model";

/**
 * Problem Type controller
 *
 * @author Michiel Swaanen
 *
 */

/**
 * Fetch all the problem types from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchAll = async (req: Request, res: Response) => {
    try {
        const problemTypes = await ProblemTypeModel.findAll();
        const statusCode = problemTypes == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                problemTypes: problemTypes
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
 * Fetch a specific problem type from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetch = async (req: Request, res: Response) => {
    const problemTypeID = req.params.id;

    try {
        const problemType = await ProblemTypeModel.findByPk(problemTypeID);
        const statusCode = problemType == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                problemType: problemType
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
 * Add a problem type to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const problemType = await ProblemTypeModel.create({
            title: req.body.title,
            priority: req.body.priority,
            description: req.body.description,
        });

        res.status(201).send({
            status: 'success',
            data: {problemType: problemType},
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
 * Modify a specific column for a problem type
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const modify = async (req: Request, res: Response) => {
    const problemTypeID = req.params.id;
    const problemType = req.body.problemType;

    if (!problemType)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await ProblemTypeModel.update(problemType, {
            returning: true, where: {id: problemTypeID}
        });

        const updatedProblemType = result[1][0];
        const statusCode = updatedProblemType == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {problemType: updatedProblemType},
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
 * Delete a specific problem type
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const remove = async (req: Request, res: Response) => {
    const problemTypeID = req.params.id;

    try {
        const deletedProblemType = await ProblemTypeModel.destroy({where: {id: problemTypeID}});
        const statusCode = deletedProblemType == null ? 404 : 200;
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
