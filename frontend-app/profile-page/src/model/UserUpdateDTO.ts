export class UserUpdateDTO {
    name: string;
    surname: string;
    phone: string;
    birthDate: string;

    constructor(name: string, surname: string, phone: string, birthDate: string) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.birthDate = birthDate;
    }
}
