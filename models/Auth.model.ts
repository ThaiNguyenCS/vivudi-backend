import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

export const ROLES = {
    USER: 'user',
    ADMIN: 'admin'
} as const;

interface AuthAttrs {
    id: string
    email: string;
    phoneNumber: string;
    googleId: string;
    password: string;
    role: string;
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
    declare role: string;
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
            field: 'phone_number'
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            field: 'google_id'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ROLES.USER,
            validate: {
                isIn: [Object.values(ROLES)]
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at'
        }
    },
    {
        sequelize: database,
        tableName: "auths",
    }
)

export default Auth;