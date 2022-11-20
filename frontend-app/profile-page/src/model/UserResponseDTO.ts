import { UserRoleResponseDTO } from './UserRoleResponseDTO';

export class UserResponseDTO {
    id: string;
    name: string;
    surname: string;
    login: string;
    email: string;
    phone: string;
    birthDate: string;
    userRoles: UserRoleResponseDTO[];

    constructor(
        id: string,
        name: string,
        surname: string,
        login: string,
        email: string,
        phone: string,
        birthDate: string,
        userRoles: UserRoleResponseDTO[]
    ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.userRoles = userRoles;
    }
}
