import {
    AllowNull,
    AutoIncrement, BelongsTo,
    Column,
    CreatedAt, DataType,
    Default, ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import * as GeoLib from "geolib"
import GeneralPostModel from "./general_post.model";
import {GeolibInputCoordinates} from "geolib/es/types";

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
    @Column(DataType.DOUBLE)
    latitude! : number;

    @AllowNull(false)
    @Column(DataType.DOUBLE)
    longitude! : number;

    @Default(5)
    @Column
    radius! : number;

    @AllowNull(false)
    @Column
    sector_id! : number;

    @ForeignKey(() => GeneralPostModel)
    @AllowNull(false)
    @Column
    general_post_id! : number;

    @BelongsTo(() => GeneralPostModel)
    general_post!: GeneralPostModel;

    @UpdatedAt
    @Column
    updated_at!: Date;

    @CreatedAt
    @Column
    created_at!: Date;

    isUserOnPost(userCoords : GeolibInputCoordinates) {
        const postCoords : GeolibInputCoordinates = {latitude: this.latitude, longitude: this.longitude};
        const distanceInMeters : number = GeoLib.getDistance(userCoords, postCoords);
        return distanceInMeters < this.radius;
    }
}

export default PostModel