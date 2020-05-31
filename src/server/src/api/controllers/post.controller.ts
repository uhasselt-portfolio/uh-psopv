import {Request, Response} from "express";
import ProblemModel from "../models/problem.model";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import PostModel from "../models/post.model";
import GeneralPostModel from "../models/general_post.model";

/**
 * Post controller
 *
 * @author Michiel Swaanen
 *
 */

/**
 * Fetch/Load all the behind the foreign keys associated with this model
 */
const eagerLoadingOptions = {
    include: [{model: PostModel, all: true}]
}

/**
 * Fetch all the posts from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetchAll = async (req: Request, res: Response) => {
    try {
        const posts = await PostModel.findAll(eagerLoadingOptions);
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

/**
 * Fetch a specific post from the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const fetch = async (req: Request, res: Response) => {
    const postID = req.params.id;

    try {
        const post = await ProblemModel.findByPk(postID, eagerLoadingOptions);
        const statusCode = post == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';

        res.status(statusCode).send({
            status: statusMessage,
            data: {
                post: post
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
 * Add a post to the database
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
export const add = async (req: Request, res: Response) => {

    if (!checkRequiredParameters(req, res)) return;

    const generalPostExists = await GeneralPostModel.findByPk(req.body.general_post_id);

    if (!generalPostExists) {
        return res.status(404).send({
            status: 'fail',
            data: null,
            message: 'General post doesn\'t exist'
        });
    }

    try {
        const post = await PostModel.create({
            title: req.body.title,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            radius: req.body.radius,
            sector_id: req.body.sector_id,
            general_post_id: req.body.general_post_id,
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
}

/**
 * Modify a specific column for a post
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
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

        const updatedPost = result[1][0];
        const statusCode = updatedPost == null ? 404 : 200;
        const statusMessage = statusCode == 200 ? 'success' : 'fail';
        const message = statusMessage == 'fail' ? 'The specified ID doesn\'t exist' : null;

        res.status(statusCode).send({
            status: statusMessage,
            data: {post: updatedPost},
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
 * Delete a specific post
 *
 * @param req Incoming request
 * @param res Outgoing response
 */
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
