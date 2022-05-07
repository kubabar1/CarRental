export class UserUpdateDTO {
    name: string;
    surname: string;
    phone: string;
    birthDate: string;
    pesel: string;

    constructor(name: string, surname: string, phone: string, birthDate: string, pesel: string) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.birthDate = birthDate;
        this.pesel = pesel;
    }
}
