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

    console.log("Successfully seeded the sector table!")
}