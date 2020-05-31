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

    // Volunteers
    // 4
    await new UserModel({
        first_name: 'Lena',
        last_name: 'Wouter',
        password: '12345',
        phone_number: '0495812421',
        email: 'Lena.Wouter@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 5
    await new UserModel({
        first_name: 'Joeri',
        last_name: 'Wouter',
        password: '12345',
        phone_number: '0495812420',
        email: 'Joeri.Wouter@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 6
    await new UserModel({
        first_name: 'Seppe',
        last_name: 'Wouter',
        password: '12345',
        phone_number: '0495812419',
        email: 'Seppe.Wouter@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 7
    await new UserModel({
        first_name: 'Jojo',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812418',
        email: 'Jojo.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 8
    await new UserModel({
        first_name: 'L',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812417',
        email: 'L.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 9
    await new UserModel({
        first_name: 'Adam',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812416',
        email: 'Adam.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 10
    await new UserModel({
        first_name: 'Su',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812415',
        email: 'Su.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 11
    await new UserModel({
        first_name: 'Karel',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812414',
        email: 'Karel.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 12
    await new UserModel({
        first_name: 'Cindel',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812413',
        email: 'Cindel.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

     // 13
     await new UserModel({
        first_name: 'Jakobe',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812412',
        email: 'Jakobe.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 14
    await new UserModel({
        first_name: 'Balazs',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812411',
        email: 'Balazs.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();

    // 15
    await new UserModel({
        first_name: 'Joi',
        last_name: 'Grootjans',
        password: '12345',
        phone_number: '0495812410',
        email: 'Joi.Grootjans@student.uhasselt.be',
        permission_type_id: 1,
        association_id: 1
    }).save();
    

    // Manager
    // 16
    await new UserModel({
        first_name: 'Emu',
        last_name: 'Lator',
        password: '12345',
        phone_number: '+15555215556',
        email: 'emu.lator@android.com',
        permission_type_id: 2,
        association_id: 1
    }).save();

    // 17
    await new UserModel({
        first_name: 'Jo',
        last_name: 'Hendrikx',
        password: '12345',
        phone_number: '+15555215555',
        email: 'Jo.Hendrikx@android.com',
        permission_type_id: 2,
        association_id: 1
    }).save();

    // 18
    await new UserModel({
        first_name: 'Adam',
        last_name: 'Hendrikx',
        password: '12345',
        phone_number: '+15555215550',
        email: 'Adam.Hendrikx@android.com',
        permission_type_id: 2,
        association_id: 1
    }).save();

    // 19
    await new UserModel({
        first_name: 'Kollie',
        last_name: 'Hendrikx',
        password: '12345',
        phone_number: '+15555215510',
        email: 'JKollie.Hendrikx@android.com',
        permission_type_id: 2,
        association_id: 1
    }).save();

    // 20
    await new UserModel({
        first_name: 'Sup',
        last_name: 'Hendrikx',
        password: '12345',
        phone_number: '+1555521110',
        email: 'Sup.Hendrikx@android.com',
        permission_type_id: 2,
        association_id: 1
    }).save();

    // 21
    await new UserModel({
        first_name: 'Xian',
        last_name: 'Hendrikx',
        password: '12345',
        phone_number: '+1555520',
        email: 'Xian.Hendrikx@android.com',
        permission_type_id: 2,
        association_id: 1
    }).save();

    console.log("Successfully seeded the user table!")
}