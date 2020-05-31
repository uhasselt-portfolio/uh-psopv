import ShiftModel from "../models/shift.model";
import {DateTime} from "luxon";

const dateFormat: string = "dd/MM/yyyy HH:mm";

/**
 * Transform a readable date into a UTC timezoned date
 *
 * @param localDate Readable date string
 */
const createDate = (localDate: string): string => {
    return DateTime.fromFormat(localDate, dateFormat, {zone: 'Europe/Brussels'}).toUTC().toISO()
}

/**
 * Shift database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the shift table...")

    await new ShiftModel({
        name: 'Ochtend shift van 27 mei',
        begin: createDate("27/05/2020 10:45"),
        end: createDate("27/05/2020 16:45")
    }).save();

    await new ShiftModel({
        name: 'Middag shift van 29 mei',
        begin: createDate("29/05/2020 12:45"),
        end: createDate("30/05/2020 19:00"),
    }).save();

    await new ShiftModel({
        name: 'Middag shift van 31 mei',
        begin: createDate("31/05/2020 15:45"),
        end: createDate("31/05/2020 23:45"),
    }).save();

    await new ShiftModel({
        name: 'Ochtend shift van 1 juni',
        begin: createDate("01/06/2020 08:00"),
        end: createDate("01/06/2020 15:00"),
    }).save();

    await new ShiftModel({
        name: 'Nacht shift van 1 juni',
        begin: createDate("01/06/2020 23:00"),
        end: createDate("02/06/2020 07:00"),
    }).save();

    await new ShiftModel({
        name: 'Lange shift van 2 juni',
        begin: createDate("02/06/2020 08:00"),
        end: createDate("02/06/2020 22:00"),
    }).save();

    await new ShiftModel({
        name: 'Lange shift van 3 juni',
        begin: createDate("03/06/2020 08:00"),
        end: createDate("03/06/2020 22:00"),
    }).save();

    console.log("Successfully seeded the shift table!")
}