import LocalisationResponseDTO from '../model/LocalisationResponseDTO';
import VehicleStatusResponseDTO from '../model/VehicleStatusResponseDTO';
import VehicleStatCodeEnum from '../model/VehicleStatCodeEnum';
import VehicleParametersResponseDTO from '../model/VehicleParametersResponseDTO';
import VehicleResponseDTO from '../model/VehicleResponseDTO';
import CommentResponseDTO from '../model/CommentResponseDTO';

export const localisationResponseDTOMock = new LocalisationResponseDTO(
    1,
    'Poland',
    'warsaw',
    'ul. Wesola 21',
    'test@gmail.com',
    '123432123'
);

export const vehicleStatusResponseDTO = new VehicleStatusResponseDTO(VehicleStatCodeEnum.UAV, 'unavailable');

export const vehicleParametersResponseDTO = new VehicleParametersResponseDTO(
    'sedan',
    2001,
    'LPG',
    124.12,
    'manual',
    false,
    4,
    5,
    'red',
    false,
    'ford_mustang_example.jpg',
    'Lorem ipsum, test, qwerty'
);

export const vehicleResponseDTOMock = new VehicleResponseDTO(
    1,
    '213324123',
    'Ford',
    'Mustang',
    151.22,
    localisationResponseDTOMock,
    vehicleStatusResponseDTO,
    vehicleParametersResponseDTO,
    true
);

export const vehicleResponseDTOMock2 = new VehicleResponseDTO(
    2,
    '234235341',
    'Ford',
    'Mustang',
    121.22,
    localisationResponseDTOMock,
    vehicleStatusResponseDTO,
    vehicleParametersResponseDTO,
    true
);

export const commentMock = new CommentResponseDTO(1, 1, 'This is really good car', 'jan123', new Date(), 3.23);
