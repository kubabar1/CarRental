export class CommentWithRateAddDTO {
    rate: number;
    content: string;
    vehicleId: string;
    userId: string;

    constructor(rate: number, content: string, vehicleId: string, userId: string) {
        this.rate = rate;
        this.content = content;
        this.vehicleId = vehicleId;
        this.userId = userId;
    }
}
