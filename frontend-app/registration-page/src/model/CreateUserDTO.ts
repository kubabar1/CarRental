export class CreateUserDTO {
    private firstName: string;
    private lastName: string;
    private email: string;
    private phone: string;
    private birthDate: string;
    private password: string;
    private matchingPassword: string;

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
