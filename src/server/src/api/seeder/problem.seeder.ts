import ProblemModel from "../models/problem.model";

/**
 * Problem database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the problem table...")

    await new ProblemModel({
        planning_id: 1,
        problem_type_id: 1,
        created_by_id: 1
    }).save();

    await new ProblemModel({
        planning_id: 2,
        problem_type_id: 1,
        created_by_id: 1
    }).save();

    await new ProblemModel({
        planning_id: 3,
        problem_type_id: 2,
        created_by_id: 1
    }).save();


    console.log("Successfully seeded the problem table!")
}