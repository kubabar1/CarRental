export class CreateUserDTO {
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public phone?: string;
    public birthDate?: string;
    public password?: string;
    public matchingPassword?: string;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        birthDate: string,
        password: string,
        matchingPassword: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.birthDate = birthDate;
        this.password = password;
        this.matchingPassword = matchingPassword;
    }
}
