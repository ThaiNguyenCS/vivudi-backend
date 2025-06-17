import { JwtPayload } from "jsonwebtoken";

//TODO: fix
export interface CustomJwtPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
}
