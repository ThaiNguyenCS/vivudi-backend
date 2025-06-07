import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

interface AuthAttrs {
    id: string
    email: string;
    phoneNumber: string;
    googleId: string;
    password: string;
    createdAt: Date
    updatedAt: Date
}


interface AuthCreationAttrs extends Optional<AuthAttrs, 'updatedAt' | 'createdAt' | "googleId"> { }

class Auth extends Model<AuthAttrs, AuthCreationAttrs> implements AuthAttrs {

    declare id: string;
    declare email: string;
    declare phoneNumber: string;
    declare googleId: string;
    declare password: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Auth.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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
        }
    },
    {
        sequelize: database,
        tableName: "auths",
    }
)

export default Auth;