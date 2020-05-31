import PlanningModel from "../models/planning.model";

/**
 * Planning database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the planning table...")

    await new PlanningModel({
        user_id: 1,
        shift_id: 1,
        post_id: 1
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 1,
        post_id: 1
    }).save();

    await new PlanningModel({
        user_id: 3,
        shift_id: 1,
        post_id: 2
    }).save();

    await new PlanningModel({
        user_id: 1,
        shift_id: 2,
        post_id: 1
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 2,
        post_id: 2
    }).save();

    await new PlanningModel({
        user_id: 3,
        shift_id: 2,
        post_id: 1
    }).save();

    await new PlanningModel({
        user_id: 1,
        shift_id: 3,
        post_id: 3
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 3,
        post_id: 1
    }).save();

    await new PlanningModel({
        user_id: 3,
        shift_id: 3,
        post_id: 2
    }).save();

    await new PlanningModel({
        user_id: 1,
        shift_id: 3,
        post_id: 2
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 3,
        post_id: 2
    }).save();

    await new PlanningModel({
        user_id: 1,
        shift_id: 4,
        post_id: 3
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 4,
        post_id: 3
    }).save();

    await new PlanningModel({
        user_id: 1,
        shift_id: 5,
        post_id: 3
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 5,
        post_id: 3
    }).save();

    await new PlanningModel({
        user_id: 1,
        shift_id: 6,
        post_id: 1
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 6,
        post_id: 1
    }).save();

    await new PlanningModel({
        user_id: 1,
        shift_id: 7,
        post_id: 2
    }).save();

    await new PlanningModel({
        user_id: 2,
        shift_id: 7,
        post_id: 2
    }).save();



    console.log("Successfully seeded the planning table!")
}