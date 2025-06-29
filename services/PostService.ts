import PostRepository from "../repository/Post.repository";
import { inject, injectable } from "tsyringe";
import { createPostSchema } from "../validators/post.validator";
import UserProfileRepository from '../repository/UserProfile.repository';
import AppError from "../errors/AppError";
import { v4 as uuidv4 } from 'uuid';
import { createPostStatusCode } from "../statusCodes/postStatusCode";

@injectable()
class PostService {
	constructor(
		@inject('PostRepository')
		private postRepository: PostRepository,
		@inject('UserProfileRepository')
		private userProfileRepository: UserProfileRepository
	) { }

	async creatPost(userId: any, postData: {
		content: string;
		visibility: string;
		is_shared_post: boolean;
		org_post_url?: number;
		longitude?: number;
		latitude?: number;
	}) {
		try {
			const data = {
				id: uuidv4(),
				authorId: userId,
				...postData
			}
			await this.postRepository.create(data);

			return {
				statusCode: createPostStatusCode.SUCCESS.code,
				message: createPostStatusCode.SUCCESS.message,
				data: data
			};
		}
		catch (error) {
			throw new AppError(500, error as string)
		}
	}

	async getPostById(postId: string): Promise<any> {
		try {
			return await this.postRepository.getPostById(postId)
		}
		catch (error) {
			throw new AppError(500, error as string)

		}
	}

	async getAllPost(page: number, limit: number) {
		try {
			return await this.postRepository.getAll(page, limit)
		}
		catch (error) {

		}
	}

	// async uploadBufferToDrive(buffer: Buffer, fileName: string) {
	// 	const mineType = mime.lookup(fileName) || 'application/octet-stream'

	// 	const
	// }
}

export default PostService;