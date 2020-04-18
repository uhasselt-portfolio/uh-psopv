import PostModel from "../models/post.model";

export default async () => {
    console.log("Started seeding the post table...")

    await new PostModel({
        title: 'Parking naast de kerk',
        address: 'Kiewit 3500, Vijverstraat 5',
        latitude: 50.963350,
        longitude: 5.353965,
        radius: 20,
        sector_id: 1,
        general_post_id: 1
    }).save();

    await new PostModel({
        title: 'Parking Zuid',
        address: 'Kiewit 3500, Bosbeekstraat 23',
        latitude: 51.002367,
        longitude: 5.369825,
        radius: 30,
        sector_id: 1,
        general_post_id: 1
    }).save();

    await new PostModel({
        title: 'Straatafzetting einde Bosbeekdreef',
        address: 'Kiewit 3500, Bosbeekdreef 36',
        latitude: 51.022367,
        longitude: 5.169825,
        radius: 20,
        sector_id: 2,
        general_post_id: 2
    }).save();

    console.log("Successfully seeded the post table!")
}