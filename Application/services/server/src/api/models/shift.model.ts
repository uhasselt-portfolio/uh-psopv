import {AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

/**
 * Shift model
 *
 * @author Michiel Swaanen
 *
 */
@Table({tableName: "shifts"})
class ShiftModel extends Model<ShiftModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    name!: string;

    @AllowNull(false)
    @Column
    begin!: Date;

    @AllowNull(false)
    @Column
    end!: Date;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default ShiftModel