import PostModel from "../models/post.model";

/**
 * Post database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the post table...")

    // 1
    await new PostModel({
        title: 'Parking naast de kerk',
        address: 'Kiewit 3500, Vijverstraat 5',
        latitude: 50.963350,
        longitude: 5.353965,
        radius: 20,
        sector_id: 1,
        general_post_id: 1
    }).save();

    // 2
    await new PostModel({
        title: 'Parking Zuid',
        address: 'Kiewit 3500, Bosbeekstraat 23',
        latitude: 51.002367,
        longitude: 5.369825,
        radius: 30,
        sector_id: 1,
        general_post_id: 1
    }).save();

    // 3 
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 51.022367,
        longitude: 5.169825,
        radius: 20,
        sector_id: 2,
        general_post_id: 2
    }).save();

    // 4
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.962253,
        longitude: 5.353800,
        radius: 20,
        sector_id: 2,
        general_post_id: 2
    }).save();

    // 5
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.967010,
        longitude: 5.358446,
        radius: 20,
        sector_id: 2,
        general_post_id: 2
    }).save();

    // 6
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.957431,
        longitude: 5.369481,
        radius: 20,
        sector_id: 2,
        general_post_id: 2
    }).save();

     // 7
     await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.958573,
        longitude: 5.375487,
        radius: 20,
        sector_id: 2,
        general_post_id: 2
    }).save();

    // 8
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.965506,
        longitude: 5.369856,
        radius: 20,
        sector_id: 3,
        general_post_id: 2
    }).save();

    // 9
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.952316,
        longitude: 5.349057,
        radius: 20,
        sector_id: 3,
        general_post_id: 2
    }).save();

     // 10
     await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.950849,
        longitude: 5.339229,
        radius: 20,
        sector_id: 3,
        general_post_id: 2
    }).save();

    // 11
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.953532,
        longitude: 5.338027,
        radius: 20,
        sector_id: 4,
        general_post_id: 2
    }).save();
    
    // 12
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.954597,
        longitude: 5.327524,
        radius: 20,
        sector_id: 4,
        general_post_id: 2
    }).save();

    // 13
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.952910,
        longitude: 5.320128,
        radius: 20,
        sector_id: 4,
        general_post_id: 2
    }).save();

    // 14
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.932496,
        longitude: 5.339561,
        radius: 20,
        sector_id: 5,
        general_post_id: 2
    }).save();

    // 15
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.932215,
        longitude: 5.336627,
        radius: 20,
        sector_id: 5,
        general_post_id: 2
    }).save();

    // 16
    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 50.931508,
        longitude: 5.333805,
        radius: 20,
        sector_id: 5,
        general_post_id: 2
    }).save();

    


    

    


    console.log("Successfully seeded the post table!")
}