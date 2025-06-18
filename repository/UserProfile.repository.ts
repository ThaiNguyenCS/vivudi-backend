import { injectable } from 'tsyringe';
import UserProfile from '../models/UserProfile.model';
import Auth from '../models/Auth.model';
import { StatusCodes } from '../statusCodes/databaseStatusCode';
import AppError from '../errors/AppError';

@injectable()
class UserProfileRepository {
    async findById(id: string) {
        try {
            return await UserProfile.findOne({ where: { id } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error finding profile by ID: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async findByUserId(userId: string) {
        try {
            return await UserProfile.findOne({ where: { authId: userId } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error finding profile by user ID: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async create(profileData: {
        id: string;
        authId: string;
        lastName: string;
        firstName: string;
        sex: string;
        dob: Date;
        displayName: string;
        description?: string;
        avtUrl?: string;
        backgroundUrl?: string;
    }) {
        try {
            // Only include defined values to match the model interface
            const createData: any = {
                id: profileData.id,
                authId: profileData.authId,
                lastName: profileData.lastName,
                firstName: profileData.firstName,
                sex: profileData.sex,
                dob: profileData.dob,
                displayName: profileData.displayName
            };

            if (profileData.description !== undefined) {
                createData.description = profileData.description;
            }
            if (profileData.avtUrl !== undefined) {
                createData.avtUrl = profileData.avtUrl;
            }
            if (profileData.backgroundUrl !== undefined) {
                createData.backgroundUrl = profileData.backgroundUrl;
            }

            return await UserProfile.create(createData);
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error creating profile: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async update(userId: string, updateData: {
        lastName?: string;
        firstName?: string;
        sex?: string;
        dob?: Date;
        displayName?: string;
        description?: string;
        avtUrl?: string;
        backgroundUrl?: string;
    }) {
        try {
            return await UserProfile.update(updateData, { where: { authId: userId } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error updating profile: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }

    async findUserById(userId: string) {
        try {
            return await Auth.findOne({ where: { id: userId } });
        } catch (error) {
            throw new AppError(
                StatusCodes.DATABASE_ERROR,
                `Error finding user by ID: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }
}

export default UserProfileRepository; 