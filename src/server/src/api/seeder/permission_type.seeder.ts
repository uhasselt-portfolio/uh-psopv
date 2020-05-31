import PermissionTypeModel from "../models/permission_type.model";

/**
 * Permission Type database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the permission type table...")

    await new PermissionTypeModel({name: 'Vrijwilliger'}).save();
    await new PermissionTypeModel({name: 'Sectorverantwoordelijke'}).save();
    await new PermissionTypeModel({name: 'Administrator'}).save();

    console.log("Successfully seeded the permission type table!")
}