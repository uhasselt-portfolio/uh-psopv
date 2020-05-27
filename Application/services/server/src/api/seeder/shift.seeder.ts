import ShiftModel from "../models/shift.model";
import {DateTime} from "luxon";

const dateFormat : string = "dd/MM/yyyy HH:mm";

const createDate = (localDate : string) : string => {
    return DateTime.fromFormat(localDate, dateFormat, {zone: 'Europe/Brussels'}).toUTC().toISO()
}

export default async () => {
    console.log("Started seeding the shift table...")

    await new ShiftModel({
        name: 'Middag shift',
        begin: createDate("26/05/2020 21:38"),
        end: createDate("26/05/2020 21:40")
    }).save();

    await new ShiftModel({
        name: 'Late shift',
        begin: createDate("27/05/2020 10:45"),
        end: createDate("27/05/2020 16:45")
    }).save();

    await new ShiftModel({
        name: 'Vroege shift',
        begin: createDate("27/05/2020 10:45"),
        end: createDate("29/05/2020 16:45")
    }).save();

    await new ShiftModel({
        name: 'Goede shift',
        begin: createDate("29/05/2020 12:45"),
        end: createDate("30/05/2020 19:00"),
    }).save();
    console.log("Successfully seeded the shift table!")
}