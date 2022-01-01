export class SettingsUpdateDTO {
    userLogin: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    pesel: string;
    birthDate: string;

    constructor(
        userLogin: string,
        name: string,
        surname: string,
        email: string,
        phone: string,
        pesel: string,
        birthDate: string
    ) {
        this.userLogin = userLogin;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.pesel = pesel;
        this.birthDate = birthDate;
    }
}
