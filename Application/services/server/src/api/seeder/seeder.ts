import associationSeeder from './association.seeder'
import userSeeder from './user.seeder'
import permissionTypeSeeder from './permission_type.seeder'

export default async () => {
    // Not associated with any table
    await associationSeeder();
    await permissionTypeSeeder();

    // Associated with 1 or more tables
    await userSeeder();
}