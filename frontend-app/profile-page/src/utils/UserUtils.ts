import { UserRoleResponseDTO } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';

export const mapUserRolesDtoToStringArray = (userRoles: UserRoleResponseDTO[]): string[] => {
    return userRoles
        ? userRoles.map((userRole: UserRoleResponseDTO) => TranslationService.translate(userRole.type))
        : [];
};

export const userHasAnyRole = (userRoles: string[], allowedRoles?: string[]): boolean => {
    if (!allowedRoles) {
        return true;
    } else {
        return userRoles.some((userRole: string) => {
            return allowedRoles.includes(userRole);
        });
    }
};

export const userHasRole = (userRoles: string[], allowedRole: string): boolean => {
    return userRoles.includes(allowedRole);
};
