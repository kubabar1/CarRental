class LocalisationResponseDTO {
    id: number;
    country: string;
    city: string;
    streetAndNb: string;
    code: string;
    email: string;
    phone: string;

    constructor(
        id: number,
        country: string,
        city: string,
        streetAndNb: string,
        code: string,
        email: string,
        phone: string
    ) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.streetAndNb = streetAndNb;
        this.code = code;
        this.email = email;
        this.phone = phone;
    }
}

export default LocalisationResponseDTO;
