import ShiftModel from "../models/shift.model";
import {DateTime} from "luxon";

export default async () => {
    console.log("Started seeding the shift table...")

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: DateTime.local(2020, 4, 23, 8),
        end: DateTime.local(2020,4, 23, 23)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: DateTime.local(2020,4, 24, 9),
        end: DateTime.local(2020,4, 24, 18)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: DateTime.local(2020,4, 25, 10),
        end: DateTime.local(2020,4, 25, 22)
    }).save();

    console.log("Successfully seeded the shift table!")
}