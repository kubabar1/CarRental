import React from 'react';
import date from 'date-and-time';

interface ReceptionDateHourProperties {
    setReceptionDate: (receptionDate: Date) => void;
    setReceptionHour: (receptionHour: number) => void;
    returnDate: Date | null;
}

function getMinDate(): string {
    return date.format(date.addDays(new Date(), 1), 'YYYY-MM-DD');
}

export function ReceptionDateHour(props: ReceptionDateHourProperties): JSX.Element {
    const maxReceptionDate: string = props.returnDate
        ? date.format(date.addDays(props.returnDate, -2), 'YYYY-MM-DD')
        : '';
    return (
        <div className="form-group">
            <label>Reception date and hour:</label>
            <div className="input-group">
                <input
                    type="date"
                    id="reception_date"
                    name="reception_date"
                    min={getMinDate()}
                    max={maxReceptionDate}
                    className="form-control"
                    required
                    onChange={(event) => props.setReceptionDate(new Date(event.target.value))}
                />
                <input
                    type="time"
                    id="reception_hour"
                    name="reception_hour"
                    className="form-control"
                    required
                    onChange={(event) => props.setReceptionHour(parseInt(event.target.value))}
                />
            </div>
        </div>
    );
}
