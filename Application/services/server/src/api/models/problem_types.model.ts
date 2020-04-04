import {AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

@Table({tableName: "problem_types"})
class ProblemTypesModel extends Model<ProblemTypesModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id! : number;

    @AllowNull(false)
    @Column
    title! : string;

    @AllowNull(false)
    @Column
    priority! : number;

    @AllowNull(false)
    @Column
    description!: string;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}