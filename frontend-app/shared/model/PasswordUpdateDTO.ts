export class PasswordUpdateDTO {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;

    constructor(currentPassword: string, newPassword: string, confirmPassword: string) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}
