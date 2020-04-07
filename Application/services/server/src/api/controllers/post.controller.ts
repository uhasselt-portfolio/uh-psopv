import {Request, Response} from "express";
import ProblemModel from "../models/problem.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PostModel from "../models/post.model";

export const fetchAll = async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.findAll();
        const statusCode = posts == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                posts: posts
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
    const postID = req.params.id;

    try {
        const post = await ProblemModel.findByPk(postID);
        const statusCode = post == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                post: post
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
        const post = PostModel.create({
            title: req.body.title,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            radius: req.body.radius,
            sector: req.body.sector,
        });

        res.status(201).send({
            status: 'success',
            data: {post: post},
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
    const postID = req.params.id;
    const post = req.body.post;

    if (!post)
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'Required parameters not provided'
        });

    try {
        const result = await PostModel.update(post, {
            returning: true, where: {id: postID}
        });

        // TODO: Checking if result is not empty --> index out of range
        const updatedPost = result[1][0];
        const statusCode = updatedPost == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {post: updatedPost},
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
    const postID = req.params.id;

    try {
        const deletedPost = await PostModel.destroy({where: {id: postID}});
        const statusCode = deletedPost == null ? 404 : 200;
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
