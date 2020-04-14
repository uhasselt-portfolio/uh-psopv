import AssociationModel from "../models/association.model";
import UserModel from "../models/user.model";

export default async () => {
    console.log("Started seeding the user table...")

    await new UserModel({
        first_name: 'Wouter',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812456',
        email: 'wouter.grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    await new UserModel({
        first_name: 'Maria',
        last_name: 'Hendrikx',
        password: '12345',
        phone_number: '0495812455',
        email: 'maria.hendrikx@student.uhasselt.be',
        permission_type_id: 2,
        association_id: 1
    }).save();

    await new UserModel({
        first_name: 'Michiel',
        last_name: 'Swaanen',
        password: '12345',
        phone_number: '0495812458',
        email: 'michiel.swaanen@student.uhasselt.be',
        permission_type_id: 3,
        association_id: 1
    }).save();

    console.log("Successfully seeded the user table!")
}