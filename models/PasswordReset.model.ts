import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

interface PasswordResetAttrs {
    id: string;
    email: string;
    otp: string;
    expiresAt: Date;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface PasswordResetCreationAttrs extends Optional<PasswordResetAttrs, "id" | "used" | "createdAt" | "updatedAt"> {}

class PasswordReset extends Model<PasswordResetAttrs, PasswordResetCreationAttrs> implements PasswordResetAttrs {
    declare id: string;
    declare email: string;
    declare otp: string;
    declare expiresAt: Date;
    declare used: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PasswordReset.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        used: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        tableName: "password_resets",
    }
);

export default PasswordReset; 