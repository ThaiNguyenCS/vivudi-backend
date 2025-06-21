import { Router, Request, Response, NextFunction } from "express";
import container from "../config/container";
import PostController from "../controllers/Post.controller";
import { validateToken, AuthenticatedRequest } from "../middlewares/authenticate.middleware";

const router = Router();
const postController = container.resolve<PostController>('PostController');

router.post("/", validateToken, async (req: Request, res: Response, next: NextFunction) => {
  await postController.createPost(req as AuthenticatedRequest, res, next);
});

router.get("/:id", validateToken, async (req: Request, res: Response, next: NextFunction) => {
  await postController.getPostById(req, res, next);
});

router.get("/", validateToken, async (req: Request, res: Response, next: NextFunction) => {
  await postController.getAllPosts(req as AuthenticatedRequest, res, next);
});

router.put("/:id", validateToken, async (req: Request, res: Response, next: NextFunction) => {
  await postController.updatePost(req as AuthenticatedRequest, res, next);
});

router.delete("/:id", validateToken, async (req: Request, res: Response, next: NextFunction) => {
  await postController.deletePost(req as AuthenticatedRequest, res, next);
});


export default router; 