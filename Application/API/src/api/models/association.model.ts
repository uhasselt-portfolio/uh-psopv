import {AllowNull, AutoIncrement, Column, Model, NotNull, PrimaryKey, Table} from "sequelize-typescript";

@Table({tableName: "associations", })
class AssociationModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @AllowNull(false)
    @Column
    name!: string;
}

export default AssociationModel