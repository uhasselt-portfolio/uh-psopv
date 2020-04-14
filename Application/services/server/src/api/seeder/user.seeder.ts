import AssociationModel from "../models/association.model";
import UserModel from "../models/user.model";

export default async () => {
    console.log("Started seeding the association table...")

    await new UserModel({
        first_name: 'Wouter',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812456',
        email: 'wouter.grootjans@student.uhasselt.be',
        permission: 'User',
        association_id: 1
    }).save();

    console.log("Successfully seeded the association table!")
}