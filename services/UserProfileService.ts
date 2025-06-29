import { injectable, inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../errors/AppError';
import { CreateProfileStatus, GetProfileStatus, UpdateProfileStatus } from '../statusCodes/userProfileStatusCode';
import UserProfileRepository from '../repository/UserProfile.repository';

@injectable()
class UserProfileService {
    constructor(
        @inject('UserProfileRepository')
        private userProfileRepository: UserProfileRepository
    ) {}

    async createEmptyProfile(userId: string) {
        // Check if user exists
        const user = await this.userProfileRepository.findUserById(userId);
        if (!user) {
            throw new AppError(CreateProfileStatus.USER_NOT_FOUND.code, CreateProfileStatus.USER_NOT_FOUND.message);
        }

        // Check if profile already exists
        const existingProfile = await this.userProfileRepository.findByUserId(userId);
        if (existingProfile) {
            throw new AppError(CreateProfileStatus.PROFILE_EXISTS.code, CreateProfileStatus.PROFILE_EXISTS.message);
        }

        // Create profile with unique ID and auth ID from token
        await this.userProfileRepository.create({
            id: uuidv4(),
            authId: userId,
            firstName: '',
            lastName: '',
            sex: 'other',
            dob: new Date(0),
            displayName: `user_${userId.substring(0, 8)}`,
        });

        return {
            statusCode: CreateProfileStatus.SUCCESS.code,
            message: CreateProfileStatus.SUCCESS.message,
            data: null
        };
    }

    async createProfile(userId: string, profileData: {
        firstName: string;
        lastName: string;
        sex: string;
        dob: Date;
        displayName: string;
        description?: string;
        avtUrl?: string;
        backgroundUrl?: string;
    }) {
        // Check if user exists
        const user = await this.userProfileRepository.findUserById(userId);
        if (!user) {
            throw new AppError(CreateProfileStatus.USER_NOT_FOUND.code, CreateProfileStatus.USER_NOT_FOUND.message);
        }

        // Check if profile already exists. Throw an error if an empty profile already exists
        const existingProfile = await this.userProfileRepository.findByUserId(userId);
        if (existingProfile) {
            throw new AppError(CreateProfileStatus.PROFILE_EXISTS.code, CreateProfileStatus.PROFILE_EXISTS.message);
        }

        // Create profile with unique ID and auth ID from token
        await this.userProfileRepository.create({
            id: uuidv4(), // Generate unique profile ID
            authId: userId, // Use auth user ID from token
            ...profileData
        });

        return {
            statusCode: CreateProfileStatus.SUCCESS.code,
            message: CreateProfileStatus.SUCCESS.message,
            data: null
        };
    }

    async getProfile(userId: string) {
        // Check if user exists
        const user = await this.userProfileRepository.findUserById(userId);
        if (!user) {
            throw new AppError(GetProfileStatus.USER_NOT_FOUND.code, GetProfileStatus.USER_NOT_FOUND.message);
        }

        // Get profile
        const profile = await this.userProfileRepository.findByUserId(userId);
        if (!profile) {
            throw new AppError(GetProfileStatus.PROFILE_NOT_FOUND.code, GetProfileStatus.PROFILE_NOT_FOUND.message);
        }

        return {
            statusCode: GetProfileStatus.SUCCESS.code,
            message: GetProfileStatus.SUCCESS.message,
            data: {
                first_name: profile.firstName,
                last_name: profile.lastName,
                sex: profile.sex,
                dob: profile.dob,
                reward_points: profile.rewardPoints,
                display_name: profile.displayName,
                description: profile.description,
                avt_url: profile.avtUrl,
                background_url: profile.backgroundUrl,
                is_verified: profile.isVerified
            }
        };
    }

    async getProfileById(profileId: string) {
        // Get profile
        const profile = await this.userProfileRepository.findById(profileId);
        if (!profile) {
            throw new AppError(GetProfileStatus.PROFILE_NOT_FOUND.code, GetProfileStatus.PROFILE_NOT_FOUND.message);
        }

        return {
            statusCode: GetProfileStatus.SUCCESS.code,
            message: GetProfileStatus.SUCCESS.message,
            data: {
                first_name: profile.firstName,
                last_name: profile.lastName,
                sex: profile.sex,
                dob: profile.dob,
                display_name: profile.displayName,
                description: profile.description,
                avt_url: profile.avtUrl,
                background_url: profile.backgroundUrl,
                is_verified: profile.isVerified
            }
        };
    }

    async updateProfile(userId: string, updateData: {
        firstName?: string;
        lastName?: string;
        sex?: string;
        dob?: Date;
        displayName?: string;
        description?: string;
        avtUrl?: string;
        backgroundUrl?: string;
    }) {
        // Check if user exists
        const user = await this.userProfileRepository.findUserById(userId);
        if (!user) {
            throw new AppError(UpdateProfileStatus.USER_NOT_FOUND.code, UpdateProfileStatus.USER_NOT_FOUND.message);
        }

        // Check if profile exists
        const existingProfile = await this.userProfileRepository.findByUserId(userId);
        if (!existingProfile) {
            throw new AppError(UpdateProfileStatus.PROFILE_NOT_FOUND.code, UpdateProfileStatus.PROFILE_NOT_FOUND.message);
        }

        // Update profile
        await this.userProfileRepository.update(userId, updateData);

        return {
            statusCode: UpdateProfileStatus.SUCCESS.code,
            message: UpdateProfileStatus.SUCCESS.message,
            data: null
        };
    }
}

export default UserProfileService; 