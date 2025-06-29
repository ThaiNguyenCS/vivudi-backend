import { inject, injectable } from 'tsyringe';
import AppError from '../errors/AppError';
import Media from '../models/Media.model';

@injectable()
class MediaRepository {

  async create(mediaData: {
    id: string;
    postId: string;
    url: string;
    type: string; // e.g., 'image', 'video', etc.

  }) {
    try {
      await Media.create(mediaData)

    }
    catch (error) {
      throw new AppError(500, error as string)
    }
  }

  async getMediaByPostId(post_id: string) {
    try {
      return await Media.findAll({ where: { postId: post_id } })

    }
    catch (error) {
      throw new AppError(500, error as string)
    }
  }
}

export default MediaRepository