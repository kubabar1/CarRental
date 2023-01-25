export class PasswordResetRequestDTO {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}
