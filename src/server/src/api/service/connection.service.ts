import UserModel from "../models/user.model";
import {Op} from "sequelize";
import PlanningModel from "../models/planning.model";
import ShiftModel from "../models/shift.model";
import ProblemModel from "../models/problem.model";

export const startUserConnectionListener = (seconds: number) => {

    setInterval(async () => {
        console.log("Listening to user connection... @" + new Date());
        const users = await UserModel.findAll({where: {is_connected: true}});

        for (let user of users) {
            const lastUpdateAt: number = new Date(user.updated_at).getTime();
            const tenMinutes = 10 * 60 * 1000;

            if ((lastUpdateAt + tenMinutes) < new Date().getTime()) {

                await addProblem(user.id);

                await UserModel.update({is_connected: false}, {where: {id: user.id}});
            }
        }
    }, seconds * 1000)
}

/**
 *
 * @param userID Specify which user its planning you want to check
 * @return -1       -> No active planning
 *         {number} -> Active planning id
 */
const getUserActivePlanningID : (userID: number) => Promise<Number> = async (userID: number) : Promise<Number> => {

    const where = {
        begin: {[Op.lt]: new Date().getTime()},
        end: {[Op.gt]: new Date().getTime()},
    }

    const activePlanning = await PlanningModel.findOne({
        where: {user_id: userID},
        include: [{
            model: PlanningModel, include: [{
                model: ShiftModel,
                where: where
            }]
        }]
    });

    return activePlanning == null ? -1 : activePlanning.id;
}

const addProblem = async (userID : number) => {
    const planningID = await getUserActivePlanningID(userID);

    if(planningID != 1) {
        await ProblemModel.create({
            planning_id: planningID,
            problem_type_id: 6,
            created_by_id: 3
        });
    }
}