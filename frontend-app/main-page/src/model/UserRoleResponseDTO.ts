export class UserRoleResponseDTO {
    id: string;
    type: string;

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }
}
