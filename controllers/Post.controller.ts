import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticate.middleware";
import PostService from "../services/PostService";
import { inject, injectable } from "tsyringe";
import { createPostSchema } from "../validators/post.validator";
import { buildErrorResponse, buildNormalResponse } from "../types/ApiResponse";
import { createPostStatusCode, GetPostStatusCode } from "../statusCodes/postStatusCode";
import { any, not, string } from "joi/lib";
import AppError from "../errors/AppError";
import { authorize, uploadFile } from "../services/Google.service";
import { time } from "console";
import { v4 as uuidv4 } from 'uuid';
import MediaService from "../services/MediaService";
import { url } from "inspector";

@injectable()
class PostController {
    constructor(
        @inject('PostService') private postService: PostService,
        @inject('MediaService') private mediaService: MediaService
    ) { }

    async createPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            if (req.files !== undefined) {
                console.log(req.files)
            }
            console.log(req.body)

            const { error, value } = createPostSchema.validate(req.body)
            if (error) {
                return res.json(buildErrorResponse(
                    createPostStatusCode.INVALID_DATA.message,
                    error.details[0].message,
                    createPostStatusCode.INVALID_DATA.code,
                ))
            }

            const result = await this.postService.creatPost(req.user?.id, req.body)

            let imagesInfo = []
            if (Array.isArray(req.files) && req.files.length > 0) {
                console.log(req.files)
                const auth = await authorize()
                for (var file of req.files) {
                    const fileName = `${result.data.id}_${uuidv4()}`
                    let res = await uploadFile(file.buffer, auth, fileName, file.mimetype)

                    const mediaData = {
                        id: uuidv4(),
                        postId: result.data.id,
                        type: "image",
                        url: res.webContentLink?.split('&')[0] as string
                    }
                    this.mediaService.createMedia(mediaData)
                    imagesInfo.push(res)
                }
            }
            const payload = {
                ...result.data,
                images: imagesInfo
            }
            return res.json(buildNormalResponse(
                payload,
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

    async getPostById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const postId = req.params.id
            const result = await this.postService.getPostById(postId)


            if (!result) {
                return res.json(buildErrorResponse(
                    GetPostStatusCode.POST_NOT_FOUND.message,
                    null,
                    GetPostStatusCode.POST_NOT_FOUND.code
                ))
            }
            const payload = {
                ...result.dataValues,
            }
            return res.json(buildNormalResponse(
                payload,
                GetPostStatusCode.SUCCESS.message,
                null,
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
                    GetPostStatusCode.POST_NOT_FOUND.message,
                    null,
                    GetPostStatusCode.POST_NOT_FOUND.code
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


