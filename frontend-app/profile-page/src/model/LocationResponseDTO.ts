export class LocationResponseDTO {
    id: string;
    country: string;
    city: string;
    address: string;
    email: string;
    phone: string;

    constructor(id: string, country: string, city: string, address: string, email: string, phone: string) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }
}
