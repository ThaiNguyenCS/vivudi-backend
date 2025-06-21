import { injectable } from 'tsyringe';
import Post from '../models/Post.model';
import PasswordReset from '../models/PasswordReset.model';
import { StatusCodes, StatusMessages } from '../statusCodes/databaseStatusCode';
import AppError from '../errors/AppError';
import { UpdatePostStatusCode } from '../statusCodes/postStatusCode';

@injectable()
class PostRepository {
  // async findByEmail(email: string) {
  //   try {
  //     return await Post.findOne({ where: { email } });
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error finding user by email: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async findByPhoneNumber(phoneNumber: string) {
  //   try {
  //     return await Auth.findOne({ where: { phoneNumber } });
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error finding user by phone number: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async findById(id: string) {
  //   try {
  //     return await Auth.findOne({ where: { id } });
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error finding user by ID: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  async create(postData: {
    id: string;
    authorId: string;
    content: string;
    visibility: string;
    longitude?: number;
    latitude?: number;
    isSharedPost?: boolean;
    originalPostId?: string | null;
  }) {
    try {
      let data: any = {
        id: postData.id,
        authorId: postData.authorId,
        content: postData.content,
        visibility: postData.visibility
      }
      if (postData.longitude !== undefined) {
        data.longitude = postData.longitude
      }

      if (postData.latitude !== undefined) {
        data.latitude = postData.latitude
      }

      if (postData.isSharedPost) {
        if (!postData.originalPostId) {
          // post không tồn tại

        }

        data.is_shared_post = postData.isSharedPost
        data.originalPostId = postData.originalPostId
      }

      return await Post.create(data);

    } catch (error) {
      throw new AppError(
        StatusCodes.DATABASE_ERROR,
        `Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }


  async getPostById(postId: string) {
    try {

      return await Post.findOne({ where: { id: postId } });

    } catch (error) {
      throw new AppError(
        StatusCodes.DATABASE_ERROR,
        `Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }


  async getAll(page: number, limit: number) {
    try {

      return await Post.findAll();

    } catch (error) {
      throw new AppError(
        StatusCodes.DATABASE_ERROR,
        `Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async update(postId: string, updateData: {
    content?: string;
    visibility?: string;
    longitude?: number;
    latitude?: number;
    isSharedPost?: boolean;
    originalPostId?: string | null;
  }){
    try{
      //chuan bi object de update
      const data: any = {};
      if (updateData.content !== undefined) data.content = updateData.content;
      if (updateData.visibility !== undefined) data.visibility = updateData.visibility;
      if (updateData.longitude !== undefined) data.longitude = updateData.longitude;
      if (updateData.latitude !== undefined) data.latitude = updateData.latitude;

      //neu la bai chia se thi phai co originalPostId
      if (updateData.isSharedPost !== undefined) {
      if (updateData.isSharedPost && !updateData.originalPostId) {
        throw new AppError(
          UpdatePostStatusCode.BAD_REQUEST.code,
          'originalPostId is required when isSharedPost = true'
        );
      }
      data.isSharedPost = updateData.isSharedPost;
      data.originalPostId = updateData.originalPostId ?? null;
    }

     const [rowsAffected, [updatedPost]] = await Post.update(data, {
      where: { id: postId },
      returning: true,      
      individualHooks: true     
    });

     if (rowsAffected === 0) {
      throw new AppError(
        UpdatePostStatusCode.POST_NOT_FOUND.code, UpdatePostStatusCode.POST_NOT_FOUND.message
      );
    }
    return updatedPost;
  }
    catch(error){
      throw new AppError(
        StatusCodes.DATABASE_ERROR,
        `Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async delete(postId: string) {
  try {
    const deletedRows = await Post.destroy({
      where: { id: postId }
    });

    return deletedRows > 0;
  } catch (error) {
    throw new AppError(
      StatusCodes.DATABASE_ERROR,
      `Error deleting post: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}


  // async updatePassword(email: string, hashedPassword: string) {
  //   try {
  //     return await Auth.update(
  //       { password: hashedPassword },
  //       { where: { email } }
  //     );
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error updating password: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async updatePasswordById(id: string, hashedPassword: string) {
  //   try {
  //     return await Auth.update(
  //       { password: hashedPassword },
  //       { where: { id } }
  //     );
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error updating password by ID: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async createPasswordReset(resetData: {
  //   id: string;
  //   email: string;
  //   otp: string;
  //   expiresAt: Date;
  // }) {
  //   try {
  //     return await PasswordReset.create(resetData);
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error creating password reset: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async findPasswordResetByOTP(otp: string) {
  //   try {
  //     return await PasswordReset.findOne({ where: { otp } });
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error finding password reset by OTP: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async markPasswordResetAsUsed(otp: string) {
  //   try {
  //     return await PasswordReset.update(
  //       { used: true },
  //       { where: { otp } }
  //     );
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error marking password reset as used: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }

  // async deleteExpiredPasswordResets() {
  //   try {
  //     return await PasswordReset.destroy({
  //       where: {
  //         expiresAt: {
  //           [require('sequelize').Op.lt]: new Date()
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     throw new AppError(
  //       StatusCodes.DATABASE_ERROR,
  //       `Error deleting expired password resets: ${error instanceof Error ? error.message : 'Unknown error'}`
  //     );
  //   }
  // }
}

export default PostRepository; 