export class EquipmentResponseDTO {
    equipmentCode: string;
    description: string;

    constructor(equipmentCode: string, description: string) {
        this.equipmentCode = equipmentCode;
        this.description = description;
    }
}
