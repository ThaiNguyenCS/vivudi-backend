interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface PaginatedResponse<T> {
    success: boolean;
    statusCode: number;
    data: {
        items: T[];
        pagination: Pagination;
    };
    message: string | null;
    error: any;
}


interface NormalResponse<T> {
    success: boolean;
    statusCode: number;
    data?: T;
    message: string | null;
    error: any;
}

export function buildPaginatedResponse<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
    statusCode: number
): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);

    return {
        success: true,
        statusCode,
        data: {
            items,
            pagination: {
                total,
                page,
                limit,
                totalPages,
            }
        },
        message: null,
        error: null
    };
}

export function buildNormalResponse<T>(
    data: T,
    message: string | null = null,
    error: any = null,
    statusCode: number
): NormalResponse<T> {
    return {
        success: true,
        statusCode,
        data,
        message,
        error
    };
}

export function buildErrorResponse(
    message: string,
    error: any = null,
    statusCode: number
): NormalResponse<null> {
    return {
        success: false,
        statusCode,
        message,
        error
    };
}