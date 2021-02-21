import React from 'react';
import date from 'date-and-time';

interface ReceptionDateHourInputs {
    receptionDate?: Date;
    receptionHour?: string;
    returnDate?: Date;
    selectedReceptionDate?: Date;
    selectedReceptionHour?: string;
    setReceptionDate: (receptionDate: Date) => void;
    setReceptionHour: (receptionHour: string) => void;
}

export function ReceptionDateHourInputs(props: ReceptionDateHourInputs): JSX.Element {
    const getMinDate = (): string => {
        return date.format(date.addDays(new Date(), 1), 'YYYY-MM-DD');
    };

    const maxReceptionDate: string = props.returnDate
        ? date.format(date.addDays(props.returnDate, -2), 'YYYY-MM-DD')
        : '';

    return (
        <div>
            <div className="form-group">
                <label>Reception date:</label>
                <input
                    type="date"
                    id="reception-date"
                    name="reception-date"
                    value={props.receptionDate ? date.format(props.receptionDate, 'YYYY-MM-DD') : ''}
                    min={getMinDate()}
                    max={maxReceptionDate}
                    className="form-control"
                    required
                    onChange={(event) => props.setReceptionDate(new Date(event.target.value))}
                />
            </div>
            <div className="form-group">
                <label>Reception hour:</label>
                <input
                    type="time"
                    id="reception-hour"
                    name="reception-hour"
                    className="form-control"
                    value={props.receptionHour ? props.receptionHour : ''}
                    required
                    onChange={(event) => props.setReceptionHour(event.target.value)}
                />
            </div>
        </div>
    );
}
