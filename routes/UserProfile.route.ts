import { Router, Request, Response, NextFunction } from "express";
import container from "../config/container";
import UserProfileController from "../controllers/UserProfile.controller";
import { validateToken, AuthenticatedRequest } from "../middlewares/authenticate.middleware";

const router = Router();
const userProfileController = container.resolve<UserProfileController>('UserProfileController');

router.post("/", validateToken, async (req: Request, res: Response, next: NextFunction) => {
    await userProfileController.createProfile(req as AuthenticatedRequest, res, next);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    await userProfileController.getProfileById(req, res, next);
});

router.get("/", validateToken, async (req: Request, res: Response, next: NextFunction) => {
    await userProfileController.getProfile(req as AuthenticatedRequest, res, next);
});

router.put("/", validateToken, async (req: Request, res: Response, next: NextFunction) => {
    await userProfileController.updateProfile(req as AuthenticatedRequest, res, next);
});

export default router; 