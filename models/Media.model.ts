import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

interface MediaAttrs {
    id: string;
    postId: string;
    url: string;
    type: string; // e.g., 'image', 'video', etc.
    createdAt: Date;
    updatedAt: Date;
}

interface MediaCreationAttrs extends Optional<MediaAttrs, 'createdAt' | 'updatedAt'> { }

class Media extends Model<MediaAttrs, MediaCreationAttrs> implements MediaAttrs {
    declare id: string;
    declare postId: string;
    declare url: string;
    declare type: string; // e.g., 'image', 'video', etc.
    declare createdAt: Date;
    declare updatedAt: Date;
}

Media.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        postId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'post_id',
            references: {
                model: 'posts',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',

            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: database,
        tableName: "media",
    }
)



export default Media;