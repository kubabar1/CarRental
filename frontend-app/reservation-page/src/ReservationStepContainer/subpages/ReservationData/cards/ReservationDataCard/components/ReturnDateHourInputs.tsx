import React from 'react';
import date from 'date-and-time';

interface ReturnDateHourInputsProperties {
    returnDate?: Date;
    returnHour?: string;
    receptionDate?: Date;
    setReturnDate: (returnDate: Date) => void;
    setReturnHour: (returnHour: string) => void;
}

export function ReturnDateHourInputs(props: ReturnDateHourInputsProperties): JSX.Element {
    const minReturnDate: string = props.receptionDate
        ? date.format(date.addDays(props.receptionDate, 1), 'YYYY-MM-DD')
        : '';

    const getMinDateReturn = (): string => {
        return date.format(date.addDays(new Date(), 2), 'YYYY-MM-DD');
    };

    console.log(props.returnHour);

    return (
        <div>
            <div className="form-group">
                <label>Return date:</label>
                <input
                    type="date"
                    id="return_date"
                    name="return_date"
                    min={minReturnDate !== '' ? minReturnDate : getMinDateReturn()}
                    value={props.returnDate ? date.format(props.returnDate, 'YYYY-MM-DD') : ''}
                    className="form-control"
                    required
                    onChange={(event) => props.setReturnDate(new Date(event.target.value))}
                />
            </div>
            <div className="form-group">
                <label>Return hour:</label>
                <input
                    type="time"
                    id="return_hour"
                    name="return_hour"
                    className="form-control"
                    required
                    value={props.returnHour ? props.returnHour : ''}
                    onChange={(event) => props.setReturnHour(event.target.value)}
                />
            </div>
        </div>
    );
}
