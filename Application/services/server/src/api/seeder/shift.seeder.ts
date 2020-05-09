import ShiftModel from "../models/shift.model";
import {DateTime} from "luxon";

export default async () => {
    console.log("Started seeding the shift table...")

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: DateTime.local(2020, 5, 1, 8),
        end: DateTime.local(2020, 5, 1, 23)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: DateTime.local(2020, 5, 2, 6),
        end: DateTime.local(2020, 5, 2, 19)
    }).save();

    await new ShiftModel({
        name: 'Waarde wordt niet gebruikt op dit moment',
        begin: DateTime.local(2020, 5, 3, 6),
        end: DateTime.local(2020, 5, 3, 22)
    }).save();

    console.log("Successfully seeded the shift table!")
}