import ItemModel from "../models/item.model";

export default async () => {
    console.log("Started seeding the item table...")

    await new ItemModel({
        planning_id: 1,
        item_type_id: 1
    }).save();

    await new ItemModel({
        planning_id: 1,
        item_type_id: 2
    }).save();

    await new ItemModel({
        planning_id: 2,
        item_type_id: 5
    }).save();

    await new ItemModel({
        planning_id: 2,
        item_type_id: 6
    }).save();

    await new ItemModel({
        planning_id: 3,
        item_type_id: 3
    }).save();

    await new ItemModel({
        planning_id: 3,
        item_type_id: 4
    }).save();

    await new ItemModel({
        planning_id: 4,
        item_type_id: 1
    }).save();


    console.log("Successfully seeded the item table!")
}