import AssociationModel from "./association.model";

export default async () => {
    console.log("Started seeding the association table...")

    await new AssociationModel({name: 'Chiro Kiewit Meisjes'}).save();
    await new AssociationModel({name: 'Chiro Kiewit Jongens'}).save();

    console.log("Successfully seeded the association table!")
}