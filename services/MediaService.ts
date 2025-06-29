import { expression } from "joi/lib";
import AppError from "../errors/AppError";
import { inject, injectable } from "tsyringe";
import MediaRepository from "../repository/Media.repository";

@injectable()
class MediaService {
  constructor(@inject('MediaRepository') private mediaRepository: MediaRepository) { }

  async createMedia(data: {
    id: string;
    postId: string;
    url: string;
    type: string;
  }) {
    try {
      await this.mediaRepository.create(data)

    }
    catch (error) {
      throw new AppError(500, error as string)
    }
  }

  async getMedia(postId: string) {
    try {
      return await this.mediaRepository.getMediaByPostId(postId)
    }
    catch (error) {
      throw new AppError(500, error as string)
    }
  }
}

export default MediaService