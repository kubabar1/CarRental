export const homeLink = '/';
export const carListLink = '/car-list';
export const carListPageableLink = '/car-list?page=:page';
export const bestOffersLink = '/best-offers';
export const bestOffersPageableLink = '/best-offers?page=:page';
export const carDetailsLink = '/car-details/:carId';
export const carDetailsByIdLink = (carId: string): string => `/car-details/${carId}`;
export const aboutUsLink = '/about-us';
export const contactLink = '/contact';
