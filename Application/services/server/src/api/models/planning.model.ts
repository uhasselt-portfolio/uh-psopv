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
import UserModel from "./user.model";
import PostModel from "./post.model";
import ShiftModel from "./shift.model";

@Table({tableName: "plannings"})
class PlanningModel extends Model<PlanningModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column
    user_id!: number;

    @BelongsTo(() => UserModel)
    user!: UserModel

    @ForeignKey(() => ShiftModel)
    @AllowNull(false)
    @Column
    shift_id!: number;

    @BelongsTo(() => ShiftModel)
    shift!: ShiftModel

    @ForeignKey(() => PostModel)
    @AllowNull(false)
    @Column
    post_id!: number;

    @BelongsTo(() => PostModel)
    post!: PostModel

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default PlanningModel