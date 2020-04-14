import AssociationModel from "../models/association.model";
import UserModel from "../models/user.model";
import PermissionTypeModel from "../models/permission_type.model";

export default async () => {
    console.log("Started seeding the association table...")

    await new PermissionTypeModel({name: 'Vrijwilliger'}).save();
    await new PermissionTypeModel({name: 'Sectorverantwoordelijke'}).save();
    await new PermissionTypeModel({name: 'Administrator'}).save();

    console.log("Successfully seeded the association table!")
}