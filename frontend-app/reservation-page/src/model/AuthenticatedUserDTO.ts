import { UserRoleResponseDTO } from './UserRoleResponseDTO';

export class AuthenticatedUserDTO {
    authenticated: boolean;
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthDate: string;
    userRoles: UserRoleResponseDTO[];

    constructor(
        authenticated: boolean,
        id: number,
        name: string,
        surname: string,
        email: string,
        phone: string,
        birthDate: string,
        userRoles: UserRoleResponseDTO[]
    ) {
        this.authenticated = authenticated;
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.userRoles = userRoles;
    }
}
