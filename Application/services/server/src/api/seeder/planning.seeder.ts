import PlanningModel from "../models/planning.model";

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

    console.log("Successfully seeded the planning table!")
}