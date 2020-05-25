import ShiftModel from "../models/shift.model";
import {DateTime} from "luxon";

export default async () => {
    console.log("Started seeding the shift table...")

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: new Date(2020, 4,25, 4, 30),
        end: new Date(2020, 4,25, 14, 30),
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: Date.UTC(2020, 4,25, 6, 30),
        end: Date.UTC(2020, 4,25, 16, 30)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: Date.UTC(2020, 4,25, 8, 30),
        end: Date.UTC(2020, 4,25, 18, 30)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: Date.UTC(2020, 4,25, 10, 30),
        end: Date.UTC(2020, 4,25, 20, 30)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: Date.UTC(2020, 4,25, 12, 30),
        end: Date.UTC(2020, 4,25, 22, 30)
    }).save();


    console.log("Successfully seeded the shift table!")
}