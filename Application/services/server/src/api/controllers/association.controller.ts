import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import AssociationModel from "../models/association.model";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const associations = await AssociationModel.findAll();
        const statusCode = associations == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                associations: associations
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
    const associationID = req.params.id;

    try {
        const association = await AssociationModel.findByPk(associationID);
        const statusCode = association == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                association: association
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
        const association = await AssociationModel.create({
            name: req.body.name
        });

        res.status(201).send({
            status: 'success',
            data: {association: association},
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
    const associationID = req.params.id;
    const association = req.body.association;

    if (!association)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await AssociationModel .update(association, {
            returning: true, where: {id: associationID}
        });

        const updatedAssociation = result[1][0];
        const statusCode = updatedAssociation == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {association: updatedAssociation},
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
    const associationID = req.params.id;

    try {
        const deletedAssociation = await AssociationModel.destroy({where: {id: associationID}});
        const statusCode = deletedAssociation == null ? 404 : 200;
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
