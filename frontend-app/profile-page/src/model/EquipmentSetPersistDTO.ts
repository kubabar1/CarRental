import { EquipmentPersistDTO } from './EquipmentPersistDTO';

export class EquipmentSetPersistDTO {
    equipments: EquipmentPersistDTO[];

    constructor(equipments: EquipmentPersistDTO[]) {
        this.equipments = equipments;
    }
}
