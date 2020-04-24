import {Request, Response} from "express";
import UserModel from "../models/user.model";
import ProblemModel from "../models/problem.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PlanningModel from "../models/planning.model";
import ProblemTypeModel from "../models/problem_type.model";
import ItemModel from "../models/item.model";
import {Op} from "sequelize";
import PostModel from "../models/post.model";
import ShiftModel from "../models/shift.model";
import MessageModel from "../models/message.model";

const eagerLoadingOptions = {
    include: [{
        model: ProblemModel, all: true,
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
    } catch (error) {
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }
};

export const fetchProblemsViaPlanningID = async (req: Request, res: Response) => {
    const planningID = req.params.id;

    try {
        const problems = await ProblemModel.findAll({
            where: {planning_id: planningID},
            include: [{
                model: ProblemModel, all: true,
                include: [{model: PlanningModel, all: true}]
            }]
        })
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

export const fetchProblemsViaUserID = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const problems = await ProblemModel.findAll({
            where: {created_by_id: userID},
            include: [{
                model: ProblemModel, all: true,
                include: [{model: PlanningModel, all: true}]
            }]
        })
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
}


export const fetchUnsolvedProblems = async (req: Request, res: Response) => {
    try {
        const problems = await ProblemModel.findAll({
            where: {solved: false},
            include: [{
                model: ProblemModel, all: true,
                include: [{model: PlanningModel, all: true}]
            }]
        });
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
}


export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    try {
        const userExists: UserModel | null = await UserModel.findByPk(req.body.created_by_id, eagerLoadingOptions);
        const planningExists: PlanningModel | null = await PlanningModel.findByPk(req.body.planning_id, eagerLoadingOptions);
        const problemTypeExists: ProblemTypeModel | null = await ProblemTypeModel.findByPk(req.body.problem_type_id, eagerLoadingOptions);

        if (userExists && planningExists && problemTypeExists) {
            const problem = await ProblemModel.create({
                planning_id: req.body.planning_id,
                problem_type_id: req.body.problem_type_id,
                created_by_id: req.body.created_by_id
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
                    created_by_id: userExists
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

export const reportUser = async (req: Request, res: Response) => {
    const userID = req.params.id;

    const where = {
        begin: {[Op.lt]: Date.now()},
        end: {[Op.gt]: Date.now()}
    }

    try {
        const userExists = await UserModel.findByPk(userID);

        if (!userExists) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'The user ID doesn\'t exist'
            });
        }

        const activePlanningExists = await PlanningModel.findOne({
            where: {user_id: userID},
            include: [{model: UserModel, all: true}, {model: PostModel, all: true}, {
                model: ShiftModel,
                all: true,
                where: where
            }]
        });

        if (!activePlanningExists) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'This user doesn\'t have any active planning'
            });
        }

        // Check if there was another not in post violation today
        const notInPostProblems = await ProblemModel.findAll({
            where: {created_by_id: userID, planning_id: activePlanningExists.id},
            include: [{
                model: ProblemTypeModel, where: {title: 'Post verlaten'}
            }]
        })

        let priority = notInPostProblems.length > 0 ? 10 : 5;

        // Find the not on post problem type
        const problemType = await ProblemTypeModel.findOne({where: {title: 'Post verlaten', priority}})

        // Send message to user
        if(priority == 10) {
            await MessageModel.create({
                title: 'Ga terug naar uw post!',
                message: 'U bent voor 2de keer op rij uit uw post vandaag, gelieve zo snel mogelijk terug te gaan.',
                created_by_id: 3,
                send_to_id: userID,
                priority: 10
            })
        }


        const problem = await ProblemModel.create({
            planning_id: activePlanningExists.id,
            problem_type_id: problemType?.id,
            created_by_id: userID
        });

        res.status(201).send({
            status: 'success',
            data: {problem: problem},
            message: null
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'error',
            data: null,
            message: 'Internal Server Error'
        });
    }

}

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

export const toggleProblemSolve = async (req: Request, res: Response) => {
    const problemID = req.params.id;

    try {
        const problem = await ProblemModel.findByPk(problemID);

        if (!problem) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'The specified ID doesn\'t exist'
            });
        }

        const result = await ProblemModel.update({solved: !problem.solved}, {
            returning: true, where: {id: problemID}
        });

        const updatedProblem = result[1][0];
        const statusCode = updatedProblem == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'Update wasn\'t successful' : null;

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
}

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
