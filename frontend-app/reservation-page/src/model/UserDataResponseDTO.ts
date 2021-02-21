class UserDataResponseDTO {
    userName: string;
    userSurname: string;
    phone: string;
    email: string;

    constructor(userName: string, userSurname: string, phone: string, email: string) {
        this.userName = userName;
        this.userSurname = userSurname;
        this.phone = phone;
        this.email = email;
    }
}

export default UserDataResponseDTO;
