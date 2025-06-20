import { injectable, inject } from 'tsyringe';
import { NextFunction, Request, Response } from "express";
import UserProfileService from "../services/UserProfileService";
import { createProfileSchema, updateProfileSchema } from "../validators/userProfile.validator";
import { buildNormalResponse, buildErrorResponse } from "../types/ApiResponse";
import { CreateProfileStatus, GetProfileStatus, UpdateProfileStatus } from "../statusCodes/userProfileStatusCode";
import AppError from "../errors/AppError";
import { AuthenticatedRequest } from "../middlewares/authenticate.middleware";

@injectable()
class UserProfileController {
    constructor(
        @inject('UserProfileService')
        private userProfileService: UserProfileService
    ) { }

    async createProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = createProfileSchema.validate(req.body);
            if (error) {
                return res.json(
                    buildErrorResponse(
                        CreateProfileStatus.INVALID_DATA.message,
                        error.details[0].message,
                        CreateProfileStatus.INVALID_DATA.code
                    )
                );
            }

            const userId = req.user?.id;
            if (!userId) {
                return res.json(
                    buildErrorResponse(
                        "Unauthorized",
                        "User not authenticated",
                        401
                    )
                );
            }

            const result = await this.userProfileService.createProfile(userId, {
                firstName: value.first_name,
                lastName: value.last_name,
                sex: value.sex,
                dob: value.dob,
                displayName: value.display_name,
                description: value.description || undefined,
                avtUrl: value.avt_url || undefined,
                backgroundUrl: value.background_url || undefined
            });

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.json(
                    buildErrorResponse(
                        "Unauthorized",
                        "User not authenticated",
                        401
                    )
                );
            }

            const result = await this.userProfileService.getProfile(userId);

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async getProfileById(req: Request, res: Response, next: NextFunction) {
        try {
            const profileId = req.params.id;
            if (!profileId) {
                return res.json(
                    buildErrorResponse(
                        GetProfileStatus.PROFILE_NOT_FOUND.message,
                        "Profile ID is required",
                        GetProfileStatus.PROFILE_NOT_FOUND.code
                    )
                );
            }

            const result = await this.userProfileService.getProfileById(profileId);

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }

    async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { error, value } = updateProfileSchema.validate(req.body);
            if (error) {
                return res.json(
                    buildErrorResponse(
                        UpdateProfileStatus.INVALID_DATA.message,
                        error.details[0].message,
                        UpdateProfileStatus.INVALID_DATA.code
                    )
                );
            }

            const userId = req.user?.id;
            if (!userId) {
                return res.json(
                    buildErrorResponse(
                        "Unauthorized",
                        "User not authenticated",
                        401
                    )
                );
            }

            const updateData: any = {};
            if (value.first_name !== undefined) updateData.firstName = value.first_name;
            if (value.last_name !== undefined) updateData.lastName = value.last_name;
            if (value.sex !== undefined) updateData.sex = value.sex;
            if (value.dob !== undefined) updateData.dob = value.dob;
            if (value.display_name !== undefined) updateData.displayName = value.display_name;
            if (value.description !== undefined) updateData.description = value.description || undefined;
            if (value.avt_url !== undefined) updateData.avtUrl = value.avt_url || undefined;
            if (value.background_url !== undefined) updateData.backgroundUrl = value.background_url || undefined;

            const result = await this.userProfileService.updateProfile(userId, updateData);

            return res.json(
                buildNormalResponse(
                    result.data,
                    result.message,
                    null,
                    result.statusCode
                )
            );
        } catch (error) {
            if (error instanceof AppError) {
                return res.json(
                    buildErrorResponse(
                        error.message,
                        null,
                        error.statusCode
                    )
                );
            }
            next(error);
        }
    }
}

export default UserProfileController; 