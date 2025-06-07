import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

interface PostAttrs {
    id: string;
    authorId: string;
    content: string;
    visibility: string;
    longitude: number;
    latitude: number;
    createdAt: Date;
    updatedAt: Date;
    isSharedPost: boolean;
    originalPostId: string | null;
}

interface PostCreationAttrs extends Optional<PostAttrs, 'updatedAt' | 'createdAt' | 'isSharedPost' | 'originalPostId'> { }

class Post extends Model<PostAttrs, PostCreationAttrs> implements PostAttrs {
    declare id: string;
    declare authorId: string;
    declare content: string;
    declare visibility: string;
    declare longitude: number;
    declare latitude: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare isSharedPost: boolean;
    declare originalPostId: string | null;
}

Post.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'auths', // Assuming the author is linked to the Auth model
                key: 'id',
            },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        visibility: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'public', // Assuming a default visibility
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true, // Assuming longitude can be null
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true, // Assuming latitude can be null
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        isSharedPost: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // Assuming a default value for shared posts
        },
        originalPostId: {
            type: DataTypes.STRING,
            allowNull: true, // Assuming originalPostId can be null for non-shared posts
            references: {
                model: 'posts', // Assuming the original post is also in the posts table
                key: 'id',
            },
            onUpdate: "CASCADE", // If the original post is updated, we want to cascade that change
            onDelete: 'SET NULL', // Assuming we want to set it to null if the original post is deleted
        }
    },
    {
        sequelize: database,
        tableName: 'posts',
    })