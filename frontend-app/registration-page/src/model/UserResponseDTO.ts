export class UserResponseDTO {
    private firstName: string;
    private lastName: string;
    private userName: string;
    private email: string;

    constructor(firstName: string, lastName: string, userName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
    }
}
