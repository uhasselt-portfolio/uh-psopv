import {NextFunction, Request, Response} from "express";
import JWTUtil from "../utils/jwt.util";

function notAuthorized(res: Response) {
    res.status(401).send({
        status: 'fail',
        data: null,
        message: 'Not authorized'
    })
}

export const verify = (req: Request, res: Response, next: NextFunction) => {

    let token: string | undefined = req.headers['authorization'];

    if(token == undefined) {
        notAuthorized(res);
        return;
    }

    if(token.startsWith('Bearer '))
        token = token.slice(7, token.length);

    const tokenIsValid = new JWTUtil().verify(token);

    if(!tokenIsValid) {
        notAuthorized(res);
        return;
    }

    next();
};