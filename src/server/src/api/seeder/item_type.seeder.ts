import ItemTypeModel from "../models/item_type.model";

/**
 * Item Type database seeder
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the item type table...")

    await new ItemTypeModel({name: 'Fluohesje'}).save();
    await new ItemTypeModel({name: 'Walky Talky'}).save();
    await new ItemTypeModel({name: 'Fluohesje'}).save();
    await new ItemTypeModel({name: 'Sleutels hefttruck'}).save();
    await new ItemTypeModel({name: 'Fluohesje'}).save();
    await new ItemTypeModel({name: 'Walky Talky'}).save();


    console.log("Successfully seeded the item type table!")
}