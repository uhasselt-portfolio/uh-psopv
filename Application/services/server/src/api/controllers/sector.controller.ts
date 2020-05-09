import {Request, Response} from "express";
import SectorModel from "../models/sector.model";

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