import UserModel from "../models/user.model";

export const listen = async (seconds : number) => {

    setTimeout(() => {

    }, seconds * 1000)

    const users = await UserModel.findAll({where: {is_connected: true}});

    for (let user of users) {
        const lastUpdateAt : number = new Date(user.updated_at).getTime();
        const tenMinutes = 10 * 60 * 1000;

        if((lastUpdateAt + tenMinutes) < new Date().getTime()) {
            // TODO: Possibility to add extra functionality with a "Is shift still active check"

            await UserModel.update({is_connected: false}, {where: {id: user.id}});
        }
    }
}

export const stopService = () => {

}