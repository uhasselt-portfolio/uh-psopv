import AssociationModel from './association.model';
import {
    Model,
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    IsEmail,
    Default,
    ForeignKey, AllowNull, CreatedAt, Unique, BeforeSave, UpdatedAt
} from "sequelize-typescript";
import bcrypt from 'bcrypt';

type PermissionLevel = 1 | 2 | 3;

@Table({tableName: "users"})
class UserModel extends Model<UserModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    first_name!: string;

    @AllowNull(false)
    @Column
    last_name!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @AllowNull(false)
    @Unique
    @Column
    phone_number!: string;

    @AllowNull(false)
    @IsEmail
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    permissions!: PermissionLevel;

    @Default(0)
    @Column
    current_latitude!: number;

    @Default(0)
    @Column
    current_longitude!: number;

    @AllowNull(false)
    @Default(false)
    @Column
    is_connected!: boolean;

    @ForeignKey(() => AssociationModel)
    @AllowNull(false)
    @Column
    association_id!: number;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;

    @BeforeSave
    private static beforeSaveHook(user: UserModel) {
        user.first_name = capitalizeFirstLetter(user.first_name);
        user.last_name = capitalizeFirstLetter(user.last_name);

        const salt = bcrypt.genSaltSync(8);
        user.password = bcrypt.hashSync(user.password, salt);
    }

    async validatePassword(password: string) {
        return await bcrypt.compare(password, this.password);
    };
}

function capitalizeFirstLetter(string: string): string {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export default UserModel