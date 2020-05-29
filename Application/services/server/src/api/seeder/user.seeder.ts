import UserModel from "../models/user.model";

/**
 * User database seeder
 *
 * @author Michiel Swaanen
 */
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
        phone_number: '0483209571',
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

    await new UserModel({
        first_name: 'Lena',
        last_name: 'Wouter',
        password: '12345',
        phone_number: '0495812451',
        email: 'Lena.Wouter@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    await new UserModel({
        first_name: 'Joeri',
        last_name: 'Wouter',
        password: '12345',
        phone_number: '0495812452',
        email: 'Joeri.Wouter@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    await new UserModel({
        first_name: 'Seppe',
        last_name: 'Wouter',
        password: '12345',
        phone_number: '0495812453',
        email: 'Seppe.Wouter@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    await new UserModel({
        first_name: 'Emu',
        last_name: 'Lator',
        password: '12345',
        phone_number: '+15555215556',
        email: 'emu.lator@android.com',
        permission_type_id: 2,
        association_id: 1
    }).save();

    console.log("Successfully seeded the user table!")
}