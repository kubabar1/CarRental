export class LocationAddDTO {
    country: string;
    city: string;
    streetAndNb: string;
    code: string;
    email: string;
    phone: string;

    constructor(country: string, city: string, streetAndNb: string, code: string, email: string, phone: string) {
        this.country = country;
        this.city = city;
        this.streetAndNb = streetAndNb;
        this.code = code;
        this.email = email;
        this.phone = phone;
    }
}
