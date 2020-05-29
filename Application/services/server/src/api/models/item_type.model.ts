import {AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

/**
 * Item Type model
 *
 * @author Michiel Swaanen
 *
 */
@Table({tableName: "item_types"})
class ItemTypeModel extends Model<ItemTypeModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    name!: string;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default ItemTypeModel