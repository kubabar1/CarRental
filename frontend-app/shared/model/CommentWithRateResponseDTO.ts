export class CommentWithRateResponseDTO {
    id: string;
    content: string;
    rate: number;
    vehicleId: string;
    userId: string;
    creationDate: string;

    constructor(id: string, content: string, rate: number, vehicleId: string, userId: string, creationDate: string) {
        this.id = id;
        this.content = content;
        this.rate = rate;
        this.vehicleId = vehicleId;
        this.userId = userId;
        this.creationDate = creationDate;
    }
}
