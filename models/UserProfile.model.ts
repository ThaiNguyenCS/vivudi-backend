import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

export const SEXES = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other"
} as const;

interface UserAttrs {
    id: string
    authId: string;
    lastName: string;
    firstName: string;
    sex: string;
    dob: Date;
    avtUrl: string;
    backgroundUrl: string;
    description: string;
    displayName: string;
    isVerified: boolean;
    rewardPoints: number;
    createdAt: Date
    updatedAt: Date
}

interface UserCreationAttrs extends Optional<UserAttrs, "isVerified" | "avtUrl" | 'updatedAt' | 'createdAt' | 'rewardPoints'> { }

class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
    declare id: string;
    declare authId: string;
    declare lastName: string;
    declare firstName: string
    declare dob: Date;
    declare backgroundUrl: string;
    declare avtUrl: string;
    declare description: string;
    declare displayName: string;
    declare isVerified: boolean
    declare sex: string
    declare rewardPoints: number;
    declare createdAt: Date;
    declare updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        authId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'auth_id',
            references: {
                model: 'auths',
                key: 'id',
            },
            onDelete: "RESTRICT",
            onUpdate: 'CASCADE',
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name'
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name'
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
            field: 'avt_url'
        },
        backgroundUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'background_url'
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'display_name'
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
            field: 'is_verified'
        },
        rewardPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'reward_points'
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
        tableName: "user_profiles",
    }
)

export default User;