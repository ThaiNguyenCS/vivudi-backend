import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticate.middleware";
import PostService from "../services/PostService";

class PostController {
    private postService: PostService;
    constructor(postService: any) {
        this.postService = postService;
    }

    async createPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error)
        }
    }

    async updatePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error)
        }
    }

    async deletePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error)
        }
    }

    async getPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error)
        }
    }

    async getPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
        } catch (error) {
            next(error);
        }
    }
}

export default PostController;