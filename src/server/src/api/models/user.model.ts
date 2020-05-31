import AssociationModel from './association.model';
import {
    AllowNull,
    AutoIncrement,
    BeforeSave,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    IsEmail,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from "sequelize-typescript";
import bcrypt from 'bcrypt';
import PermissionTypeModel from "./permission_type.model";

type PermissionLevel = 1 | 2 | 3;

/**
 * User model
 *
 * @author Michiel Swaanen
 *
 */
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
    @Unique
    @Column
    email!: string;

    @ForeignKey(() => PermissionTypeModel)
    @AllowNull(false)
    @Default(1)
    @Column
    permission_type_id!: PermissionLevel;

    @BelongsTo(() => PermissionTypeModel)
    permission_type!: PermissionTypeModel;

    @Default(0)
    @Column(DataType.DOUBLE)
    current_latitude!: number;

    @Default(0)
    @Column(DataType.DOUBLE)
    current_longitude!: number;

    @AllowNull(false)
    @Default(false)
    @Column
    is_connected!: boolean;

    @ForeignKey(() => AssociationModel)
    @AllowNull(false)
    @Column
    association_id!: number;

    @BelongsTo(() => AssociationModel)
    association!: AssociationModel;

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