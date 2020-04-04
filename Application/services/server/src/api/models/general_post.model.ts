import {AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import PlanningModel from "./planning.model";

@Table({tableName: "general_posts"})
class GeneralPostModel extends Model<GeneralPostModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id! : number;

    @AllowNull(false)
    @Column
    name! : string;

    @AllowNull(false)
    @Column
    minimum_age! : number;

    @AllowNull(false)
    @Column
    description! : string;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default GeneralPostModel