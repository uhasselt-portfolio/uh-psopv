import {Request, Response} from "express";
import {checkRequiredParameters} from "../middleware/parameter.middleware";
import JWTUtil from "../utils/jwt.util";
import UserModel from "../models/user.model";
import {read, utils, WorkBook} from 'xlsx'


export const importUsers = async (req: Request, res: Response) => {
    console.log('Entering user import');
    const excel = req.file;

    // console.log(excel);

    const workbook : WorkBook = read(excel.buffer, {type: "buffer"});
    const sheetName = workbook.SheetNames[0];
    const data = utils.sheet_to_json(workbook.Sheets[sheetName]);

    // console.log((workbook.Sheets[sheetName]))
    console.log(data);

    // console.log(workbook);
    // console.log(JSON.stringify(workbook.Sheets.Sheet1.A1));

    res.status(200).send({data: workbook});
};