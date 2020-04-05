import {Request, Response} from "express";
import UserModel from "../models/user.model";
import ProblemModel from "../models/problem.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const problems = await ProblemModel.findAll();
        const status = problems == null ? 404 : 200;

        res.status(status).send({
            status: 'success',
            data: {
                problems: problems
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
    const problemID = req.params.id;

    try {
        const problem = await ProblemModel.findByPk(problemID);
        const status = problem == null ? 404 : 200;

        res.status(status).send({
            status: 'success',
            data: {
                problem: problem
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
            const problem = ProblemModel.create({
                planning_id: req.body.planning_id,
                problem_type_id: req.body.problem_type_id,
                created_by: req.body.created_by
            });

            res.status(201).send({
                status: 'success',
                data: {problem: problem},
                message: null
            })
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
    const problemID = req.params.id;
    const problem = req.body.problem;

    if (!problem)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {

        const result = await ProblemModel.update(problem, {
            returning: true, where: {id: problemID}
        });

        // TODO: Checking if result is not empty --> index out of range
        const updatedProblem = result[1][0];
        const statusCode = updatedProblem == null ? 404 : 200;
        const statusMessage = updatedProblem == null ? 'fail' : 'success';

        res.status(statusCode).send({
            status: statusMessage,
            data: {problem: updatedProblem},
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
    const problemID = req.params.id;

    try {
        const deletedProblem = await ProblemModel.destroy({where: {id: problemID}});
        const statusCode = deletedProblem === null ? 404 : 200;
        const statusMessage = deletedProblem === null ? 'fail' : 'success';

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
