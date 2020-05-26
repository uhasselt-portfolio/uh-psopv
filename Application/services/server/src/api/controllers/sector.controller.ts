import {Request, Response} from "express";
import SectorModel from "../models/sector.model";
import UserModel from "../models/user.model";
import {Op} from "sequelize";
import PlanningModel from "../models/planning.model";
import PostModel from "../models/post.model";
import ShiftModel from "../models/shift.model";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const sectors = await SectorModel.findAll({include: [{all: true}]});
        const statusCode = sectors == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                sectors: sectors
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

export const fetchUsersWithUserID = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {
        const sector = await SectorModel.findOne({where: {user_id: userID}, include: [{all: true}]});
        const statusCode = sector == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                sector: sector
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

export const fetchUsersWithSectorID = async (req: Request, res: Response) => {
    const sectorID = req.params.id;

    try {
        const sectors = await SectorModel.findAll({where: {sector_type: sectorID}, include: [{all: true}]});
        const statusCode = sectors == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                sectors: sectors
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

export const fetchSectorManagerWithUserID = async (req: Request, res: Response) => {
    const userID = req.params.id;

    try {

        const user = await UserModel.findByPk(userID);

        if(!user) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'The user ID doesn\'t exist'
            });
        }

        const where = {
            begin: {[Op.gt]: new Date().getTime()},
        }

        console.log("WHERE", where);

        const activePlanning = await PlanningModel.findOne({
            where: {user_id: userID},include: [{model: UserModel, all: true},{model: PostModel, all: true}, {model: ShiftModel, all: true, where: where}]
        });

        if(!activePlanning) {
            return res.status(404).send({
                status: 'fail',
                data: null,
                message: 'This user is not assigned to any planning soon. No plannings found for this user'
            });
        }

        const sectorID = activePlanning.post.sector_id;

        const sectors = await SectorModel.findAll({where: {sector_type: sectorID}, include: [{all: true}]});
        const statusCode = sectors == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                sectors: sectors
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