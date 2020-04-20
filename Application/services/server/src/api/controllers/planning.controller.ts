import {Request, Response} from "express";
import UserModel from "../models/user.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PlanningModel from "../models/planning.model";
import ShiftModel from "../models/shift.model";
import PostModel from "../models/post.model";
import {Sequelize} from "sequelize-typescript";
import {Op} from "sequelize";

const eagerLoadingOptions = {
    include: [{model: PlanningModel, all: true, include: [{model: UserModel, all: true}]}]
}

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const plannings = await PlanningModel.findAll(eagerLoadingOptions);
        const statusCode = plannings == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                plannings: plannings
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
    const planningID = req.params.id;

    try {
        const planning = await PlanningModel.findByPk(planningID, eagerLoadingOptions);
        const statusCode = planning == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                planning: planning
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

export const fetchPosts = async (req: Request, res: Response) => {
    const postID = req.params.id;

    try {
        const plannings = await PlanningModel.findAll({where:
                {post_id: postID}, include: [{model: PlanningModel, all: true }]
        });

        const statusCode = plannings == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                plannings: plannings
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


export const fetchUser = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const plannings = await PlanningModel.findAll({where:
                {user_id: userID},
            include: [{model: PlanningModel, all: true, include: [{model: UserModel, all: true}]}]
        });

        const statusCode = plannings == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                plannings: plannings
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

export const fetchUsersInSameShiftAndPost = async (req: Request, res: Response) => {
    const shiftID = req.params.shift_id;
    const postID = req.params.post_id;

    try {
        const plannings = await PlanningModel.findAll({where:
                {shift_id: shiftID, post_id: postID}, include: [{model: UserModel}]
        });

        const statusCode = plannings == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                plannings: plannings
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

export const fetchCurrentShift = async (req: Request, res: Response) => {
     try {

        const where = {
            begin: {[Op.lt]: Date.now()},
            end: {[Op.gt]: Date.now()}
        }

        const plannings = await PlanningModel.findAll({
            include: [{model: UserModel, all: true},{model: PostModel, all: true}, {model: ShiftModel, all: true, where: where}]
        });
        const statusCode = plannings == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                plannings: plannings
            },
            message: null
        });
    } catch (error) {
         console.log(error);
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
        const userExists : UserModel | null = await UserModel.findByPk(req.body.user_id, eagerLoadingOptions);
        const shiftExists : ShiftModel | null = await ShiftModel.findByPk(req.body.shift_id, eagerLoadingOptions);
        const postExists : PostModel | null = await PostModel.findByPk(req.body.post_id, eagerLoadingOptions);

        if(userExists && shiftExists && postExists) {
            const planning = await PlanningModel.create({
                user_id: req.body.user_id,
                shift_id: req.body.shift_id,
                post_id: req.body.post_id
            }, eagerLoadingOptions);

            res.status(201).send({
                status: 'success',
                data: {planning: planning},
                message: null
            })
        } else {
            res.status(404).send({
                status: 'fail',
                data: {
                    user_id: userExists,
                    shift_id: shiftExists,
                    postExists: postExists
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
    const planningID = req.params.id;
    const planning = req.body.planning;

    if (!planning)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await PlanningModel.update(planning, {
            returning: true, where: {id: planningID}
        });

        const updatedPlanning = result[1][0];
        const statusCode = updatedPlanning == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {planning: updatedPlanning},
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
    const planningID = req.params.id;

    try {
        const deletedPlanning = await PlanningModel.destroy({where: {id: planningID}});
        const statusCode = deletedPlanning == null ? 404 : 200;
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
