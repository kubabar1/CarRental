/* eslint-disable @typescript-eslint/no-explicit-any */
export const carImagesProfilePage = (photoName: string): any => require(`../images/car_images/${photoName}`);
export const userImagesProfilePage = (photoName: string): any => require(`../images/user_images/${photoName}`);
export const vehicleImageFromServer = (photoName: string): string =>
    `http://localhost:8080/vehicles-images/${photoName}`;
