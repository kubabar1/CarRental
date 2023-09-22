import React from 'react';
import './AutomationSwitch.scss';
import { Control } from 'react-hook-form/dist/types/form';
import { FieldError, FieldValues } from 'react-hook-form/dist/types';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import Switch from 'react-switch';
import { Auto, Controller, PathString } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { TranslationService } from '@car-rental/shared/service';

interface AutomationSwitchProperties<FieldValuesType extends FieldValues> {
    label: string;
    name: Auto.FieldPath<FieldValuesType, PathString>;
    control: Control<FieldValuesType>;
    automationAction: () => void;
    cron: string;
    rules?: Omit<
        RegisterOptions<FieldValuesType, PathString>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    error?: FieldError | undefined;
    isDisabled?: boolean;
}

export function AutomationSwitch<FieldValuesType extends FieldValues>({
    label,
    name,
    control,
    rules,
    error,
    isDisabled = true,
    automationAction,
    cron,
}: AutomationSwitchProperties<FieldValuesType>): JSX.Element {
    return (
        <div className="form-group switch-form-group-container">
            <div className="row">
                <div className={'pl-4 mt-3 col-2 checkbox-input-container switch-col-center'}>
                    <Controller
                        name={name}
                        control={control}
                        rules={rules}
                        render={({ field: { onChange, value } }) => (
                            <Switch onChange={onChange} checked={value} disabled={isDisabled} />
                        )}
                    />
                    {error && (
                        <div className="alert alert-danger custom-alert" role="alert">
                            {error.message}
                        </div>
                    )}
                </div>
                <label className="mt-4 col-4 switch-col-center">{label}</label>
                <div className="mt-4 col-3 switch-col-center">
                    <input className="form-control" disabled={isDisabled} value={cron} />
                </div>
                <div className="mt-4 col-3 execute-now-button-container switch-col-center">
                    <Button onClick={() => automationAction()}>
                        {TranslationService.translate('executeNowButtonLabelAutomationForm')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
