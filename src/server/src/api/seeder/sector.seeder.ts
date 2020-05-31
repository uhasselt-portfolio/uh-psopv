import SectorModel from "../models/sector.model";

/**
 * Sector database seeder
 *
 * Assign a specific sector manager to a sector
 *
 * @author Michiel Swaanen
 */
export default async () => {
    console.log("Started seeding the sector table...")

    await new SectorModel({
        user_id: 2,
        sector_type: 1,
    }).save();

    await new SectorModel({
        user_id: 17,
        sector_type: 2,
    }).save();

    await new SectorModel({
        user_id: 18,
        sector_type: 3,
    }).save();

    await new SectorModel({
        user_id: 19,
        sector_type: 4,
    }).save();

    await new SectorModel({
        user_id: 20,
        sector_type: 5,
    }).save();

    console.log("Successfully seeded the sector table!")
}