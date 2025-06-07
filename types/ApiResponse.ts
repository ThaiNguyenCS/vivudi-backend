interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface PaginatedResponse<T> {
    success: boolean;
    data: {
        items: T[];
        pagination: Pagination;
    };
    message: string | null;
    error: any;
}


interface NormalResponse<T> {
    success: boolean;
    data?: T;
    message: string | null;
    error: any;
}

export function buildPaginatedResponse<T>(
    items: T[],
    total: number,
    page: number,
    limit: number
): PaginatedResponse<T> {
    const totalPages = Math.ceil(total / limit);

    return {
        success: true,
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
    error: any = null
): NormalResponse<T> {
    return {
        success: true,
        data,
        message,
        error
    };
}

export function buildErrorResponse(
    message: string,
    error: any = null
): NormalResponse<null> {
    return {
        success: false,
        message,
        error
    };
}