import PlanningModel from "../models/planning.model";

/**
 * Planning database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the planning table...")

    // 1
    await new PlanningModel({
        user_id: 1,
        shift_id: 1,
        post_id: 1
    }).save();

    // 2
    await new PlanningModel({
        user_id: 4,
        shift_id: 1,
        post_id: 1
    }).save();

    // 3
    await new PlanningModel({
        user_id: 5,
        shift_id: 2,
        post_id: 1
    }).save();

    // 4
    await new PlanningModel({
        user_id: 6,
        shift_id: 3,
        post_id: 1
    }).save();


    // 5
    await new PlanningModel({
        user_id: 7,
        shift_id: 2,
        post_id: 1
    }).save();

    // 6
    await new PlanningModel({
        user_id: 8,
        shift_id: 3,
        post_id: 1
    }).save();

    // 7
    await new PlanningModel({
        user_id: 9,
        shift_id: 4,
        post_id: 1
    }).save();

    // 8
    await new PlanningModel({
        user_id: 10,
        shift_id: 4,
        post_id: 1
    }).save();

    // 9
    await new PlanningModel({
        user_id: 9,
        shift_id: 5,
        post_id: 1
    }).save();

    // 10
    await new PlanningModel({
        user_id: 10,
        shift_id: 5,
        post_id: 1
    }).save();

    // 11
    await new PlanningModel({
        user_id: 9,
        shift_id: 6,
        post_id: 1
    }).save();

    // 12
    await new PlanningModel({
        user_id: 10,
        shift_id: 6,
        post_id: 1
    }).save();

    // 13
    await new PlanningModel({
        user_id: 9,
        shift_id: 7,
        post_id: 1
    }).save();

    // 14
    await new PlanningModel({
        user_id: 10,
        shift_id: 7,
        post_id: 1
    }).save();

  //// post_2
  // 2
  await new PlanningModel({
    user_id: 4,
    shift_id: 1,
    post_id: 2
}).save();

// 3
await new PlanningModel({
    user_id: 5,
    shift_id: 2,
    post_id: 2
}).save();

// 4
await new PlanningModel({
    user_id: 6,
    shift_id: 3,
    post_id: 2
}).save();


// 5
await new PlanningModel({
    user_id: 7,
    shift_id: 2,
    post_id: 2
}).save();

// 6
await new PlanningModel({
    user_id: 8,
    shift_id: 3,
    post_id: 2
}).save();

// 7
await new PlanningModel({
    user_id: 9,
    shift_id: 4,
    post_id: 2
}).save();

// 8
await new PlanningModel({
    user_id: 10,
    shift_id: 4,
    post_id: 2
}).save();

// 9
await new PlanningModel({
    user_id: 9,
    shift_id: 5,
    post_id: 2
}).save();

// 10
await new PlanningModel({
    user_id: 10,
    shift_id: 5,
    post_id: 2
}).save();

// 11
await new PlanningModel({
    user_id: 9,
    shift_id: 6,
    post_id: 2
}).save()

// 12
await new PlanningModel({
    user_id: 10,
    shift_id: 6,
    post_id: 2
}).save();

// 13
await new PlanningModel({
    user_id: 9,
    shift_id: 7,
    post_id: 2
}).save();

// 14
await new PlanningModel({
    user_id: 10,
    shift_id: 7,
    post_id: 2
}).save();  

  //// post_3
  // 2
  await new PlanningModel({
    user_id: 4,
    shift_id: 1,
    post_id: 3
}).save();

// 3
await new PlanningModel({
    user_id: 5,
    shift_id: 2,
    post_id: 3
}).save();

// 4
await new PlanningModel({
    user_id: 6,
    shift_id: 3,
    post_id: 3
}).save();


// 5
await new PlanningModel({
    user_id: 7,
    shift_id: 2,
    post_id: 3
}).save();

// 6
await new PlanningModel({
    user_id: 8,
    shift_id: 3,
    post_id: 3
}).save();

// 7
await new PlanningModel({
    user_id: 9,
    shift_id: 4,
    post_id: 3
}).save();

// 8
await new PlanningModel({
    user_id: 10,
    shift_id: 4,
    post_id: 3
}).save();

// 9
await new PlanningModel({
    user_id: 9,
    shift_id: 5,
    post_id: 3
}).save();

// 10
await new PlanningModel({
    user_id: 10,
    shift_id: 5,
    post_id: 3
}).save();

// 11
await new PlanningModel({
    user_id: 9,
    shift_id: 6,
    post_id: 3
}).save()

// 12
await new PlanningModel({
    user_id: 10,
    shift_id: 6,
    post_id: 3
}).save();

// 13
await new PlanningModel({
    user_id: 9,
    shift_id: 7,
    post_id: 3
}).save();

// 14
await new PlanningModel({
    user_id: 10,
    shift_id: 7,
    post_id: 3
}).save();  





    console.log("Successfully seeded the planning table!")
}