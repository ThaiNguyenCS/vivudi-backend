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
      await this.postRepository.create({
        id: uuidv4(),
        authorId: userId,
        ...postData
      });

      return {
        statusCode: createPostStatusCode.SUCCESS.code,
        message: createPostStatusCode.SUCCESS.message,
        data: null
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
      throw new AppError(500, error as string)
    }
  }

  async updatePost(id: string, data: {
    content?: string;
    visibility?: string;
    longitude?: number;
    latitude?: number;
    isSharedPost?: boolean;
    originalPostId?: string | null;
  }){
    try {
      return await this.postRepository.update(id, data);
    }
    catch (error) {
      throw new AppError(500, error as string)
    }
  }

  async deletePost(postId: string) {
  try {
    const deleted = await this.postRepository.delete(postId);
    return deleted; 
  } catch (error) {
    throw new AppError(500, error instanceof Error ? error.message : 'Unknown error');
  }
  }

}

export default PostService;