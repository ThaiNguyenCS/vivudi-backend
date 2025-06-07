import { DataTypes, Model } from "sequelize";
import database from "./database";

export const ArtifactReactionTypes = {
    POST: 'post',
    COMMENT: 'comment',
}

interface ArtifactReactionAttrs {
    ownerId: string;
    artifactId: string;
    artifactType: string;
    reactionId: string;
}

interface ArtifactReactionCreationAttrs extends ArtifactReactionAttrs { }

class ArtifactReaction extends Model<ArtifactReactionAttrs, ArtifactReactionCreationAttrs> implements ArtifactReactionAttrs {
    declare ownerId: string;
    declare artifactId: string;
    declare artifactType: string;
    declare reactionId: string;
}

ArtifactReaction.init(
    {
        ownerId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'auth', // Assuming you have a 'users' table
                key: 'id',
            }
        },
        artifactId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        artifactType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[Object.values(ArtifactReactionTypes)]],
            },
        },
        reactionId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize: database, // Assuming 'database' is your Sequelize instance
        modelName: 'ArtifactReaction',
        tableName: 'artifact_reactions',
    })
export default ArtifactReaction;