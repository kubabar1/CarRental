export class AuthenticatedUserDTO {
    authenticated: boolean;
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthDate: string;
    userRoles: string[];

    constructor(
        authenticated: boolean,
        id: number,
        name: string,
        surname: string,
        email: string,
        phone: string,
        birthDate: string,
        userRoles: string[]
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
