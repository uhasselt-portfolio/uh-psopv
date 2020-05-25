import ShiftModel from "../models/shift.model";
import {DateTime} from "luxon";

const dateFormat : string = "dd/MM/yyyy HH:mm";

const createDate = (localDate : string) : string => {
    return DateTime.fromFormat(localDate, dateFormat, {zone: 'Europe/Brussels'}).toUTC().toISO()
}

export default async () => {
    console.log("Started seeding the shift table...")

    try {
        await new ShiftModel({
            name: 'Waarde wordt niet gebruikt op dit moment',
            begin: createDate("25/05/2020 23:30"),
            end: createDate("26/05/2020 01:45")
        }).save();

        await new ShiftModel({
            name: 'Waarde wordt niet gebruikt op dit moment',
            begin: createDate("25/05/2020 10:45"),
            end: createDate("25/05/2020 16:45")
        }).save();

        await new ShiftModel({
            name: 'Waarde wordt niet gebruikt op dit moment',
            begin: createDate("25/05/2020 12:45"),
            end: createDate("25/05/2020 19:00"),
        }).save();
    } catch(e) {
        console.log("ERROR", e);
    }

    console.log("Successfully seeded the shift table!")
}