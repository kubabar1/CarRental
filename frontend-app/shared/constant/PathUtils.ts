export const DEFAULT_START_PAGE = 0;

export const DEFAULT_PAGE_SIZE = 10;

export const DEFAULT_PAGE_INDEX = 0;

export const createAppAddr = (
    protocol: string,
    hostname: string,
    port: number | undefined,
    context: string | undefined
): string => {
    return `${protocol}://${hostname}${port ? `:${port}` : ''}${context ? `${context}` : ''}`;
};

export const withId = (basePath: string, id: string): string => {
    return `${basePath}/${id}`;
};

export const PAGE_REQUEST = (
    url: string,
    page: number = DEFAULT_START_PAGE,
    size: number = DEFAULT_PAGE_SIZE,
    filter?: string,
    sortBy?: string,
    desc = false
): string =>
    `${url}?page=${page}&size=${size}${filter ? `&filter=${filter}` : ''}${
        sortBy ? `&sort=${sortBy},${desc ? 'DESC' : 'ASC'}` : ''
    }`;
