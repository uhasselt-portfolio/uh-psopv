import ProblemTypeModel from "../models/problem_type.model";

export default async () => {
    console.log("Started seeding the problem type table...")

    await new ProblemTypeModel({
        title: 'Te Laat',
        priority: 5,
        description: 'Je bent te laat aan je shift begonnen'
    }).save();

    await new ProblemTypeModel({
        title: 'Onvoorziene Pauze',
        priority: 10,
        description: 'Je bent tijdens je werkuren naar de wc gegaan'
    }).save();

    await new ProblemTypeModel({
        title: 'Ziek',
        priority: 5,
        description: 'Je gaat vroeger naar huis wegens ziekte'
    }).save();


    console.log("Successfully seeded the problem type table!")
}