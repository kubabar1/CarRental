export class UserRoleResponseDTO {
    id: string;
    type: string;
    label: string;

    constructor(id: string, type: string, label: string) {
        this.id = id;
        this.type = type;
        this.label = label;
    }
}
