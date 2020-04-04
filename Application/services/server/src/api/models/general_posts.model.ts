import {AllowNull, AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

@Table({tableName: "general_posts"})
class GeneralPosts extends Model<GeneralPosts> {

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