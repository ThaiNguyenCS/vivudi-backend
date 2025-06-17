export const StatusCodes = {
    // Database success codes
    DATABASE_SUCCESS: 0,

    // Database error codes
    DATABASE_ERROR: 100,

} as const;

export const StatusMessages = {
    // Database success messages
    [StatusCodes.DATABASE_SUCCESS]: "Database operation completed successfully",

    // Database error messages
    [StatusCodes.DATABASE_ERROR]: "Database error occurred",

} as const;

// Type for status codes
export type StatusCode = typeof StatusCodes[keyof typeof StatusCodes];
