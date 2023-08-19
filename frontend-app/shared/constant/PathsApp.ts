const protocol = 'http';
const host = 'localhost';
const port = '3030';

const domain = `${protocol}://${host}:${port}`;

export const homePath = `${domain}/`;
export const loginPath = `${domain}/login`;
export const logoutPath = `${domain}/logout`;
export const profilePath = `${domain}/profile`;
export const registrationPath = `${domain}/registration`;
