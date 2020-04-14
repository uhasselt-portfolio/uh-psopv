import associationSeeder from './association.seeder'
import userSeeder from './user.seeder'
import permissionTypeSeeder from './permission_type.seeder'
import PermissionTypeModel from "../models/permission_type.model";

export const databaseAlreadySeeded = async () => {
    const result = await PermissionTypeModel.findAll();

    return result !== null;
}

export default async () => {
    if(!await databaseAlreadySeeded()) {
        // Not associated with any table
        await associationSeeder();
        await permissionTypeSeeder();

        // Associated with 1 or more tables
        await userSeeder();
    } else {
        console.log("Database already seeded!")
    }
}