export class PasswordResetDTO {
    newPassword: string;
    confirmPassword: string;
    token: string;

    constructor(newPassword: string, confirmPassword: string, token: string) {
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
        this.token = token;
    }
}
