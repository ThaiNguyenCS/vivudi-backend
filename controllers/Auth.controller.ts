import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
    private authService: AuthService;
    constructor({ authService }: { authService: AuthService }) {
        this.authService = authService;
    }

    async loginByPassword(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }


    async loginByGoogle(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;