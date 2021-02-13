class CommentResponseDTO {
    id: number;
    vehicleId: number;
    commentContent: string;
    userLogin: string;
    creationDate: Date;
    rating: number;

    constructor(
        id: number,
        vehicleId: number,
        commentContent: string,
        userLogin: string,
        creationDate: Date,
        rating: number
    ) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.commentContent = commentContent;
        this.userLogin = userLogin;
        this.creationDate = creationDate;
        this.rating = rating;
    }
}

export default CommentResponseDTO;
