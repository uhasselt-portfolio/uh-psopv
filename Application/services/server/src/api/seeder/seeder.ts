import associationSeeder from './association.seeder'
import userSeeder from './user.seeder'
import permissionTypeSeeder from './permission_type.seeder'
import itemTypeSeeder from './item_type.seeder'
import generalPostSeeder from './general_post.seeder'
import shiftSeeder from './shift.seeder'
import postSeeder from './post.seeder'
import planningSeeder from './planning.seeder'
import itemSeeder from './item.seeder'
import messageSeeder from './message.seeder'
import problemTypeSeeder from './problem_types.seeder'
import problemSeeder from './problem.seeder'
import sectorSeeder from './sector.seeder'

import PermissionTypeModel from "../models/permission_type.model";

export const databaseAlreadySeeded = async () => {
    const result = await PermissionTypeModel.findAll();
    return result.length > 0;
}

export default async () => {
    if(!await databaseAlreadySeeded()) {
        // Not associated with any table
        await associationSeeder();
        await permissionTypeSeeder();
        await itemTypeSeeder();
        await generalPostSeeder();
        await shiftSeeder();

        // Associated with 1 or more tables
        await userSeeder();
        await postSeeder();
        await planningSeeder();
        await itemSeeder();
        await messageSeeder();
        await problemTypeSeeder();
        await problemSeeder();
        await sectorSeeder();
    } else {
        console.log("Aborted seeding > Database already contains records!")
    }
}