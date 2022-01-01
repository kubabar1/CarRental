import { UserResponseDTO } from '../model/UserResponseDTO';
import { UserRoleResponseDTO } from '../model/UserRoleResponseDTO';
import { UserRolesEnum } from '../utils/UserRolesEnum';
import { SettingsUpdateDTO } from '../model/SettingsUpdateDTO';

export const getCurrentUserData = (): UserResponseDTO => {
    return new UserResponseDTO(
        '123',
        'Jan',
        'Kowalski',
        'jan123',
        'jan@test.com',
        '12345',
        new Date('Aug 9, 1995'),
        '11111111111',
        [new UserRoleResponseDTO('1', UserRolesEnum.ROLE_ADMIN)]
    );
};

export const getUsersList = (): Promise<UserResponseDTO[]> => {
    return Promise.all([
        new UserResponseDTO(
            '123',
            'Jan',
            'Kowalski',
            'jan123',
            'jan@test.com',
            '12345',
            new Date('Aug 9, 1995'),
            '11111111111',
            [new UserRoleResponseDTO('1', UserRolesEnum.ROLE_ADMIN)]
        ),
        new UserResponseDTO(
            '124',
            'Adam',
            'Nowak',
            'adam123',
            'adam@test.com',
            '11332',
            new Date('Jul 19, 1991'),
            '22222222222',
            [new UserRoleResponseDTO('2', UserRolesEnum.ROLE_OFFICE_EMPLOYEE)]
        ),
        new UserResponseDTO(
            '125',
            'Marek',
            'Test',
            'marek123',
            'marek@test.com',
            '43123',
            new Date('Jan 12, 1992'),
            '33333333333',
            [
                new UserRoleResponseDTO('2', UserRolesEnum.ROLE_OFFICE_EMPLOYEE),
                new UserRoleResponseDTO('3', UserRolesEnum.ROLE_RENTING_EMPLOYEE),
            ]
        ),
    ]);
};

export const getAllUserRoles = (): Promise<UserRoleResponseDTO[]> => {
    return Promise.all(
        Object.keys(UserRolesEnum).map(
            (userRole: string, id: number) => new UserRoleResponseDTO(id.toString(), userRole)
        )
    );
};

export const updateUserSettings = (settingsUpdateDTO: SettingsUpdateDTO): Promise<void> => {
    return new Promise<void>(() => {
        console.log(settingsUpdateDTO);
    });
};

export const updateUserRoles = (userRoleId: string, userId: string): Promise<void> => {
    return new Promise<void>(() => {
        console.log(`Adding role with ID "${userRoleId}" to user with ID "${userId}"`);
    });
};
