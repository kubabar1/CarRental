class ReservationStatusResponseDTO {
    id: string;
    message: string;
    isOk: boolean;

    constructor(id: string, message: string, isOk: boolean) {
        this.id = id;
        this.message = message;
        this.isOk = isOk;
    }
}

export default ReservationStatusResponseDTO;
