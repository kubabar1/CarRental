export class CommentResponseDTO {
    id: string;
    content: string;
    vehicleId: string;
    userId: string;
    creationDate: string;

    constructor(id: string, vehicleId: string, content: string, userId: string, creationDate: string) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.content = content;
        this.userId = userId;
        this.creationDate = creationDate;
    }
}
