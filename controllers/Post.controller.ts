import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticate.middleware";
import PostService from "../services/PostService";
import { inject, injectable } from "tsyringe";
import { createPostSchema, updatePostSchema } from "../validators/post.validator";
import { buildErrorResponse, buildNormalResponse } from "../types/ApiResponse";
import { createPostStatusCode, DeletePostStatusCode, GetPostStatusCode, UpdatePostStatusCode } from "../statusCodes/postStatusCode";
import { not, string } from "joi/lib";
import AppError from "../errors/AppError";

@injectable()
class PostController {
    constructor(
        @inject('PostService')
        private postService: PostService
    ) { }

    async createPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = createPostSchema.validate(req.body)
            if (error) {
                return res.json(buildErrorResponse(
                    createPostStatusCode.INVALID_DATA.message,
                    error.details[0].message,
                    createPostStatusCode.INVALID_DATA.code,
                ))
            }

            const result = await this.postService.creatPost(req.user?.id, req.body)
            return res.json(buildNormalResponse(
                result.data,
                createPostStatusCode.SUCCESS.message,
                null,
                createPostStatusCode.SUCCESS.code,
            ))
        }

        catch (error) {
            next(error)
        }
    }

    async updatePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // const { error } = updatePostSchema.validate(req.body)
            // if (error) {
            //     return res.json(buildErrorResponse(
            //         UpdatePostStatusCode.INVALID_DATA.message,
            //         error.details[0].message,
            //         UpdatePostStatusCode.INVALID_DATA.code,
            //     ))
            // }
            const dto = {
                content: req.body.content,
                visibility: req.body.visibility,
                longitude: req.body.longitude ? parseFloat(req.body.longitude) : undefined,
                latitude: req.body.latitude ? parseFloat(req.body.latitude) : undefined,
                isSharedPost: req.body.is_shared_post,
                originalPostId: req.body.org_post_url
            };
            const postId = req.params.id;
            const result = await this.postService.updatePost(postId, dto);
            if (!result) {
                return res.json(buildErrorResponse(
                    UpdatePostStatusCode.POST_NOT_FOUND.message,
                    null,
                    UpdatePostStatusCode.POST_NOT_FOUND.code
                ))
            }

            return res.json(buildNormalResponse(
                result,
                UpdatePostStatusCode.SUCCESS.message,
                null,
                UpdatePostStatusCode.SUCCESS.code,
            ))
        } catch (error) {
            next(error)
        }
    }

    async deletePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const postId = req.params.id;
            const deleted = await this.postService.deletePost(postId);

            if (!deleted) {
            return res.json(buildErrorResponse(
                DeletePostStatusCode.POST_NOT_FOUND.message,
                null,
                DeletePostStatusCode.POST_NOT_FOUND.code
            ));
            }

            return res.json(buildNormalResponse(
            null,
            null,
            DeletePostStatusCode.SUCCESS.message,
            DeletePostStatusCode.SUCCESS.code
            ));
        } catch (error) {
            next(error);
        }
}

    async getPostById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const postId = req.params.id;
            const result =  await this.postService.getPostById(postId);

            if (!result) {
                return res.json(buildErrorResponse(
                    GetPostStatusCode.USER_NOT_FOUND.message,
                    null,
                    GetPostStatusCode.USER_NOT_FOUND.code
                ))
            }

            return res.json(buildNormalResponse(
                result,
                null,
                GetPostStatusCode.SUCCESS.message,
                GetPostStatusCode.SUCCESS.code
            ))

        } catch (error) {
            next(error)
        }
    }

    async getAllPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const page = req.query["page"] ? parseInt(req.query["page"] as string) : 1
            const limit = req.query["limit"] ? parseInt(req.query["limit"] as string) : 5
            const result = await this.postService.getAllPost(page, limit)

            if (!result) {
                return res.json(buildErrorResponse(
                    GetPostStatusCode.USER_NOT_FOUND.message,
                    null,
                    GetPostStatusCode.USER_NOT_FOUND.code
                ))
            }

            return res.json(buildNormalResponse(
                result,
                null,
                GetPostStatusCode.SUCCESS.message,
                GetPostStatusCode.SUCCESS.code
            ))
        } catch (error) {
            next(error);
        }
    }
}

export default PostController;