import { Model } from "sequelize";

interface MediaAttrs {
    id: string;
    url: string;
    type: string; // e.g., 'image', 'video', etc.
    createdAt: Date;
}

interface MediaCreationAttrs { }

class Media extends Model<MediaAttrs, MediaCreationAttrs> implements MediaAttrs {
    declare id: string;
    declare url: string;
    declare type: string; // e.g., 'image', 'video', etc.
    declare createdAt: Date;
}

export default Media;