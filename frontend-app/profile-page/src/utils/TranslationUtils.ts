import { BookingStateCodeEnum } from '@car-rental/shared/model';
import { TranslationService } from '@car-rental/shared/service';

export const translateBookingCode = (bookingCode: BookingStateCodeEnum) => {
    switch (bookingCode) {
        case BookingStateCodeEnum.CAN:
            return TranslationService.translate('canceledStateBookingAuditLogs');
        case BookingStateCodeEnum.REN:
            return TranslationService.translate('rentedStateBookingAuditLogs');
        case BookingStateCodeEnum.RES:
            return TranslationService.translate('reservedStateBookingAuditLogs');
        case BookingStateCodeEnum.RET:
            return TranslationService.translate('returnedStateBookingAuditLogs');
    }
};
