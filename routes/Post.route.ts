import { Router, Request, Response, NextFunction } from "express";
import container from "../config/container";
import PostController from "../controllers/Post.controller";
import { validateToken, AuthenticatedRequest } from "../middlewares/authenticate.middleware";
import multer from 'multer'

const router = Router();
const postController = container.resolve<PostController>('PostController');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post("/", validateToken, upload.array('files'), async (req: Request, res: Response, next: NextFunction) => {
  await postController.createPost(req as AuthenticatedRequest, res, next);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await postController.getPostById(req, res, next);
});

router.get("/", validateToken, async (req: Request, res: Response, next: NextFunction) => {
  await postController.getAllPosts(req as AuthenticatedRequest, res, next);
});

export default router; 