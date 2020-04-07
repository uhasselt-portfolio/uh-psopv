import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    Default,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import PlanningModel from "./planning.model";

@Table({tableName: "posts"})
class PostModel extends Model<PostModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id! : number;

    @AllowNull(false)
    @Column
    title! : string;

    @AllowNull(false)
    @Column
    address!: string;

    @AllowNull(false)
    @Column
    latitude! : number;

    @AllowNull(false)
    @Column
    longitude! : number;

    @Default(5)
    @Column
    radius! : number;

    @AllowNull(false)
    @Column
    sector! : number;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default PostModel