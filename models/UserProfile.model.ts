import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

export const SEXES = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other"
}

interface UserAttrs {
    id: string
    lastName: string;
    firstName: string;
    sex: string;
    dob: Date;
    avtUrl: string;
    backgroundUrl: string;
    description: string;
    displayName: string;
    isVerified: boolean;
    createdAt: Date
    updatedAt: Date
}


interface UserCreationAttrs extends Optional<UserAttrs, "isVerified" | "avtUrl" | 'updatedAt' | 'createdAt'> { }

class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
    declare id: string;
    declare lastName: string;
    declare firstName: string
    declare dob: Date;
    declare backgroundUrl: string;
    declare avtUrl: string;
    declare description: string;
    declare displayName: string;
    declare isVerified: boolean
    declare sex: string
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'auths', // Assuming the user profile model is named 'users'
                key: 'id',
            },
            onDelete: "RESTRICT",
            onUpdate: 'CASCADE',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [Object.values(SEXES)]
            }
        },
        avtUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740",
        },
        backgroundUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isVerified: {
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
        tableName: "user_profiles",
    }
)

export default User;