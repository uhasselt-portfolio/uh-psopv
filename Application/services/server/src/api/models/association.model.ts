import {AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

/**
 * Association model
 *
 * @author Michiel Swaanen
 *
 */
@Table({tableName: "associations",})
class AssociationModel extends Model {
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

export default AssociationModel