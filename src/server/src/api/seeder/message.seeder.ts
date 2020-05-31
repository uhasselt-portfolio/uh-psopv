import MessageModel from "../models/message.model";

/**
 * Message database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the item table...")

    await new MessageModel({
        title: 'Spullen',
        message: 'Vergeet niet na jullie shift al jullie spullen af te geven aan je verantwoordelijke!',
        created_by_id: 3,
        send_to_id: 2,
        priority: 1,
    }).save();

    await new MessageModel({
        title: 'Pauze',
        message: 'Vandaag heeft iedereen pauze om 13:00, niet om 12:00',
        created_by_id: 3,
        send_to_id: 2,
        priority: 5,
    }).save();

    await new MessageModel({
        title: 'Pauze',
        message: 'Vandaag heeft iedereen pauze om 14:00, niet om 12:00',
        created_by_id: 3,
        send_to_id: 2,
        priority: 5,
    }).save();

    await new MessageModel({
        title: 'Pauze',
        message: 'Vandaag heeft iedereen pauze om 15:00, niet om 12:00',
        created_by_id: 3,
        send_to_id: 2,
        priority: 5,
    }).save();

    await new MessageModel({
        title: 'Pauze',
        message: 'Vandaag heeft iedereen pauze om 16:00, niet om 12:00',
        created_by_id: 3,
        send_to_id: 2,
        priority: 5,
    }).save();

    await new MessageModel({
        title: 'Pauze',
        message: 'Koekies',
        created_by_id: 3,
        send_to_id: 2,
        priority: 5,
    }).save();

    await new MessageModel({
        title: 'Pauze',
        message: 'Koekies deel 2',
        created_by_id: 3,
        send_to_id: 2,
        priority: 5,
    }).save();


    console.log("Successfully seeded the item table!")
}