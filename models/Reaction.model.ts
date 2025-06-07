import { DataTypes, Model, Optional } from "sequelize";
import database from "./database";

interface ReactionAttrs {
    id: string;
    iconUrl: string;
    value: string;
    createdAt: Date;
}

interface ReactionCreationAttrs extends Optional<ReactionAttrs, 'createdAt'> { }

class Reaction extends Model<ReactionAttrs, ReactionCreationAttrs> implements ReactionAttrs {
    declare id: string;
    declare iconUrl: string;
    declare value: string;
    declare createdAt: Date;
}

Reaction.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        iconUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: database, // Assuming 'database' is your Sequelize instance
        modelName: 'Reaction',
        tableName: 'reactions',
    }
);

export default Reaction;
