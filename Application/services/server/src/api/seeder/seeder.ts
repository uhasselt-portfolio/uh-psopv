import associationSeeder from './association.seeder'
import userSeeder from './user.seeder'

export default async () => {
    await associationSeeder();
    await userSeeder();
}