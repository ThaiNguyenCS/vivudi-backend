// Create profile status codes and messages
export const CreateProfileStatus = {
    SUCCESS: {
        code: 0,
        message: "Profile created successfully"
    },
    PROFILE_EXISTS: {
        code: 100,
        message: "Profile already exists for this user"
    },
    INVALID_DATA: {
        code: 101,
        message: "Invalid profile data"
    },
    USER_NOT_FOUND: {
        code: 102,
        message: "User not found"
    }
} as const;

// Get profile status codes and messages
export const GetProfileStatus = {
    SUCCESS: {
        code: 0,
        message: "Profile retrieved successfully"
    },
    PROFILE_NOT_FOUND: {
        code: 100,
        message: "Profile not found"
    },
    USER_NOT_FOUND: {
        code: 101,
        message: "User not found"
    }
} as const;

// Update profile status codes and messages
export const UpdateProfileStatus = {
    SUCCESS: {
        code: 0,
        message: "Profile updated successfully"
    },
    PROFILE_NOT_FOUND: {
        code: 100,
        message: "Profile not found"
    },
    INVALID_DATA: {
        code: 101,
        message: "Invalid update data"
    },
    USER_NOT_FOUND: {
        code: 102,
        message: "User not found"
    }
} as const;

// Types for status codes
export type CreateProfileStatusCode = typeof CreateProfileStatus[keyof typeof CreateProfileStatus]['code'];
export type GetProfileStatusCode = typeof GetProfileStatus[keyof typeof GetProfileStatus]['code'];
export type UpdateProfileStatusCode = typeof UpdateProfileStatus[keyof typeof UpdateProfileStatus]['code']; 