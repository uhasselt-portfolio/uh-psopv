import {
    AllowNull,
    AutoIncrement, BelongsTo,
    Column,
    CreatedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";

import PlanningModel from "./planning.model";
import ItemTypeModel from "./item_type.model";

@Table({tableName: "items"})
class ItemModel extends Model<ItemModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id! : number;

    @ForeignKey(() => PlanningModel)
    @AllowNull(false)
    @Column
    planning_id! : number;

    @BelongsTo(() => PlanningModel)
    planning!: PlanningModel;

    @ForeignKey(() => ItemTypeModel)
    @AllowNull(false)
    @Column
    item_type_id! : number;

    @BelongsTo(() => ItemTypeModel)
    item_type!: ItemTypeModel;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default ItemModel