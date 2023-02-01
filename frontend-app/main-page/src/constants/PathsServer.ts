export const carImagesMainPageCarList = (photoName: string): string =>
    `http://localhost:8080/vehicles-images/${photoName}`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userImagesMainPage = (photoName: string): any => require(`../images/user_images/${photoName}`);
