import React from 'react';
import { BookingAdminService, TranslationService } from '@car-rental/shared/service';
import './AutomationSubpage.scss';
import { SubpageContent } from '../../../components/subpage/content/SubpageContent';
import { SubpageHeader } from '../../../components/subpage/header/SubpageHeader';
import { SubpageContainer } from '../../../components/subpage/container/SubpageContainer';
import { PathString, useForm } from 'react-hook-form';
import { AutomationSwitch } from './automation_switch/AutomationSwitch';
import { ExpiredBookingsSchedulerResponseDTO } from '@car-rental/shared/model';
import { FieldPathSetValue } from 'react-hook-form/dist/types/path';

export type AutomationSubpageFormValues = {
    cancelBookingScheduler: boolean;
};

export function AutomationSubpage(): JSX.Element {
    const automationSubpageFormValues: AutomationSubpageFormValues = {
        cancelBookingScheduler: false,
    };
    const [cancelExpiredBookingCron, setCancelExpiredBookingCron] = React.useState<string>('');

    const { formState, control, setValue } = useForm<AutomationSubpageFormValues>({
        mode: 'onChange',
        defaultValues: automationSubpageFormValues,
    });

    React.useEffect(() => {
        BookingAdminService.getCancelExpiredScheduler().then(
            (cancelExpiredScheduler: ExpiredBookingsSchedulerResponseDTO) => {
                setValue(
                    'cancelBookingScheduler',
                    cancelExpiredScheduler.cancelExpiredBookingEnabled as FieldPathSetValue<
                        AutomationSubpageFormValues,
                        PathString
                    >
                );
                setCancelExpiredBookingCron(cancelExpiredScheduler.cancelExpiredBookingCron);
            }
        );
    }, [setValue]);

    return (
        <SubpageContainer className="automation-subpage-container">
            <SubpageHeader title={TranslationService.translate('automationSubpageTitle')} />
            <SubpageContent>
                <AutomationSwitch<AutomationSubpageFormValues>
                    label={TranslationService.translate('cancelBookingSchedulerLabelAutomationForm')}
                    name={'cancelBookingScheduler'}
                    control={control}
                    error={formState.errors.cancelBookingScheduler}
                    automationAction={() => {
                        BookingAdminService.cancelExpiredBookings();
                    }}
                    cron={cancelExpiredBookingCron}
                    isDisabled={true}
                />
            </SubpageContent>
        </SubpageContainer>
    );
}
