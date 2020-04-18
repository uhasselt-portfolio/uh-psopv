import ShiftModel from "../models/shift.model";

export default async () => {
    console.log("Started seeding the shift table...")

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: Date.UTC(2020,3, 17, 9),
        end: Date.UTC(2020,3, 17, 18)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: Date.UTC(2020,8, 11, 9),
        end: Date.UTC(2020,8, 11, 18)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: Date.UTC(2020,8, 12, 10),
        end: Date.UTC(2020,8, 12, 22)
    }).save();

    console.log("Successfully seeded the shift table!")
}