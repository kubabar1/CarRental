package com.carrental.bookingservice.scheduler;

import com.carrental.bookingservice.service.BookingAdminService;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;

public class BookingScheduler implements SchedulingConfigurer {

    private final BookingSchedulerProperties bookingSchedulerProperties;

    private final BookingAdminService bookingAdminService;

    public BookingScheduler(
        BookingAdminService bookingAdminService,
        BookingSchedulerProperties bookingSchedulerProperties
    ) {
        this.bookingAdminService = bookingAdminService;
        this.bookingSchedulerProperties = bookingSchedulerProperties;
    }

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.addTriggerTask(() -> {
                if (bookingSchedulerProperties.isCancelExpiredBookingEnabled()) {
                    bookingAdminService.cancelExpiredBookings();
                }
            }, triggerContext -> {
                CronTrigger cronTrigger = new CronTrigger(bookingSchedulerProperties.getCancelExpiredBookingCron());
                return cronTrigger.nextExecutionTime(triggerContext);
            }
        );
    }
}
