import {
    AllowNull, AutoIncrement,
    Column,
    CreatedAt,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import UserModel from "./user.model";

@Table({tableName: "messages"})
class MessageModel extends Model<MessageModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id! : number;

    @AllowNull(false)
    @Column
    title! : string;

    @AllowNull(false)
    @Column
    message! : string;

    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column
    created_by! : number;

    @AllowNull(false)
    @Column
    priority! : number;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;
}

export default MessageModel