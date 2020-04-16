import {Request, Response} from "express";
import UserModel from "../models/user.model";
import ProblemModel from "../models/problem.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PlanningModel from "../models/planning.model";
import ProblemTypeModel from "../models/problem_type.model";

const eagerLoadingOptions = {
    include: [{model: ProblemModel, all: true,
        include: [{model: PlanningModel, all: true}]
    }]
}

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const problems = await ProblemModel.findAll(eagerLoadingOptions);
        const statusCode = problems == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
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
        const problem = await ProblemModel.findByPk(problemID, eagerLoadingOptions);
        const statusCode = problem == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
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
        const userExists : UserModel | null = await UserModel.findByPk(req.body.created_by, eagerLoadingOptions);
        const planningExists : PlanningModel | null = await PlanningModel.findByPk(req.body.planning_id, eagerLoadingOptions);
        const problemTypeExists : ProblemTypeModel | null = await ProblemTypeModel.findByPk(req.body.problem_type_id, eagerLoadingOptions);

        if(userExists && planningExists && problemTypeExists) {
            const problem = await ProblemModel.create({
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
                data: {
                    planning_id: planningExists,
                    problem_type_id: problemTypeExists,
                    created_by: userExists
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

        const updatedProblem = result[1][0];
        const statusCode = updatedProblem == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {problem: updatedProblem},
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
    const problemID = req.params.id;

    try {
        const deletedProblem = await ProblemModel.destroy({where: {id: problemID}});
        const statusCode = deletedProblem == null ? 404 : 200;
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
