import { Router, Request, Response, NextFunction } from "express";
import container from "../config/container";
import AuthController from "../controllers/Auth.controller";
import { validateToken, AuthenticatedRequest } from "../middlewares/authenticate.middleware";

const router = Router();
const authController = container.resolve<AuthController>('AuthController');

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    await authController.register(req, res, next);
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    await authController.login(req, res, next);
});

router.post("/forgot_password", async (req: Request, res: Response, next: NextFunction) => {
    await authController.forgotPassword(req, res, next);
});

router.post("/verify_otp", async (req: Request, res: Response, next: NextFunction) => {
    await authController.verifyOTP(req, res, next);
});

router.post("/reset_password", async (req: Request, res: Response, next: NextFunction) => {
    await authController.resetPassword(req, res, next);
});

router.post("/change_password", validateToken, async (req: Request, res: Response, next: NextFunction) => {
    await authController.changePassword(req as AuthenticatedRequest, res, next);
});

export default router;