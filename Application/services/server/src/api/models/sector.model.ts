import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import UserModel from "./user.model";

@Table({tableName: "sector"})
class SectorModel extends Model<SectorModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column
    user_id!: number;

    @BelongsTo(() => UserModel)
    user!: UserModel;

    @AllowNull(false)
    @Column
    sector_type!: number;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default SectorModel
