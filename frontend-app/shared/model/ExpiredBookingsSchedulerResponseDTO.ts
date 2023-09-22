export class ExpiredBookingsSchedulerResponseDTO {
    cancelExpiredBookingEnabled: boolean;
    cancelExpiredBookingCron: string;

    constructor(cancelExpiredBookingEnabled: boolean, cancelExpiredBookingCron: string) {
        this.cancelExpiredBookingEnabled = cancelExpiredBookingEnabled;
        this.cancelExpiredBookingCron = cancelExpiredBookingCron;
    }
}
