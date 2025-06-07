import { JwtPayload } from "jsonwebtoken";

//TODO: fix
export interface CustomJwtPayload extends JwtPayload {
    id: string;
    displayName: string | null;
    username: string;
    role: string;
}
