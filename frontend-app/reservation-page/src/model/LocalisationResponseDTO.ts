class LocalisationResponseDTO {
    id: number;
    country: string;
    city: string;
    addres: string;
    email: string;
    phone: string;

    constructor(id: number, country: string, city: string, address: string, email: string, phone: string) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.addres = address;
        this.email = email;
        this.phone = phone;
    }
}

export default LocalisationResponseDTO;
