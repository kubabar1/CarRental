import qs from 'qs';

export const getPageFromUrl = (url: string): number => {
    return parseInt(qs.parse(url, { ignoreQueryPrefix: true }).page as string) || 0;
};
