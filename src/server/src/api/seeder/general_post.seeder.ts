import GeneralPostModel from "../models/general_post.model";

/**
 * General post database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the general post table...")

    await new GeneralPostModel({
        name: 'Parking',
        minimum_age: '16',
        description: 'Begeleid auto\'s naar de dichtstbijzijnde parkeerplaats'
    }).save();

    await new GeneralPostModel({
        name: 'Straatafzetting',
        minimum_age: '16',
        description: 'Zorg ervoor dat auto\'s niet zomaar overal door kunnen'
    }).save();

    console.log("Successfully seeded the general post table!")
}