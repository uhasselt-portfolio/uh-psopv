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


    // 1
    await new ShiftModel({
        name: 'Ultra lange test shift',
        begin: createDate("22/05/2020 10:45"),
        end: createDate("10/06/2020 19:00")
    }).save();

    // 2
    await new ShiftModel({
        name: 'Middag shift van 10 juni',
        begin: createDate("10/06/2020 19:00"),
        end: createDate("11/06/2020 19:00"),
    }).save();

    // 3
    await new ShiftModel({
        name: 'Middag shift van 11 juni',
        begin: createDate("11/06/2020 19:00"),
        end: createDate("12/06/2020 19:00"),
    }).save();

    // 4
    await new ShiftModel({
        name: 'Middag shift van 12 juni',
        begin: createDate("12/06/2020 19:00"),
        end: createDate("13/06/2020 19:00"),
    }).save();

    // 5
    await new ShiftModel({
        name: 'Middag shift van 13 juni',
        begin: createDate("13/06/2020 19:00"),
        end: createDate("14/06/2020 19:00"),
    }).save();

    // 6
    await new ShiftModel({
        name: 'Middag shift van 14 juni',
        begin: createDate("14/06/2020 19:00"),
        end: createDate("15/06/2020 19:00"),
    }).save();

    // 7
    await new ShiftModel({
        name: 'Middag shift van 15 juni',
        begin: createDate("15/06/2020 19:00"),
        end: createDate("16/06/2020 19:00"),
    }).save();


    // 8 
    await new ShiftModel({
        name: 'Middag shift van 16 juni',
        begin: createDate("16/06/2020 19:00"),
        end: createDate("17/06/2020 19:00"),
    }).save();

    // 9
    await new ShiftModel({
        name: 'Middag shift van 17 juni',
        begin: createDate("17/06/2020 19:00"),
        end: createDate("18/06/2020 19:00"),
    }).save();


    //10
    await new ShiftModel({
        name: 'Middag shift van 18 juni',
        begin: createDate("18/06/2020 19:00"),
        end: createDate("19/06/2020 19:00"),
    }).save();

    //11
    await new ShiftModel({
        name: 'Middag shift van 19 juni',
        begin: createDate("19/06/2020 19:00"),
        end: createDate("20/06/2020 19:00"),
    }).save();

    //12
    await new ShiftModel({
        name: 'Middag shift van 20 juni',
        begin: createDate("20/06/2020 19:00"),
        end: createDate("21/06/2020 19:00"),
    }).save();


    console.log("Successfully seeded the shift table!")
}