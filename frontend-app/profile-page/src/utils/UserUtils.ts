import { UserRoleResponseDTO } from '../model/UserRoleResponseDTO';

export const mapUserRolesDtoToStringArray = (userRoles: UserRoleResponseDTO[]): string[] => {
    return userRoles ? userRoles.map((userRole: UserRoleResponseDTO) => userRole.type) : [];
};

export const userHasAnyRole = (userRoles: string[], allowedRoles: string[]): boolean => {
    return userRoles.some((userRole: string) => {
        return allowedRoles.includes(userRole);
    });
};

export const userHasRole = (userRoles: string[], allowedRole: string): boolean => {
    return userRoles.includes(allowedRole);
};
