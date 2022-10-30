export class CreateUserDTO {
    private firstName: string;
    private lastName: string;
    private userName: string;
    private email: string;
    private password: string;
    private matchingPassword: string;

    constructor(
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        password: string,
        matchingPassword: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.matchingPassword = matchingPassword;
    }
}
