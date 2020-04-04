import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt, Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import UserModel from "./user.model";

@Table({tableName: "problems"})
class ProblemModel extends Model<ProblemModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id! : number;

    @ForeignKey(() => PlanningModel)
    @AllowNull(false)
    @Column
    planning_id! : number;

    @ForeignKey(() => ProblemTypeModel)
    @AllowNull(false)
    @Column
    problem_type_id! : number;

    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column
    created_by! : number;

    @Default(false)
    @Column
    solved! : boolean;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}