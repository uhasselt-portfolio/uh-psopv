import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import GeneralPostModel from "../models/general_post.model";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const generalPosts = await GeneralPostModel.findAll();
        const statusCode = generalPosts == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                generalPost: generalPosts
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
    const generalPostID = req.params.id;

    try {
        const generalPost = await GeneralPostModel.findByPk(generalPostID);
        const statusCode = generalPost == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                generalPost: generalPost
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
        const generalPost = await GeneralPostModel.create({
            name: req.body.name,
            minimum_age: req.body.minimumAge,
            description: req.body.description
        });

        res.status(201).send({
            status: 'success',
            data: {generalPost: generalPost},
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
    const generalPostID = req.params.id;
    const generalPost = req.body.generalPost;

    if (!generalPost)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await GeneralPostModel.update(generalPost, {
            returning: true, where: {id: generalPostID}
        });

        const updatedGeneralPost = result[1][0];
        const statusCode = updatedGeneralPost == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {generalPost: updatedGeneralPost},
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
    const generalPostID = req.params.id;

    try {
        const deletedGeneralPost = await GeneralPostModel.destroy({where: {id: generalPostID}});
        const statusCode = deletedGeneralPost == null ? 404 : 200;
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
