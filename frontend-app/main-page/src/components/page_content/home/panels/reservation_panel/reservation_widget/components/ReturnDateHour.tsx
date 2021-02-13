import React from 'react';
import date from 'date-and-time';

interface ReturnDateHourProperties {
    setReturnDate: (returnDate: Date) => void;
    setReturnHour: (returnHour: number) => void;
    receptionDate: Date | null;
}

function getMinDateReturn(): string {
    return date.format(date.addDays(new Date(), 2), 'YYYY-MM-DD');
}

export function ReturnDateHour(props: ReturnDateHourProperties) {
    const minReturnDate: string = props.receptionDate
        ? date.format(date.addDays(props.receptionDate, 1), 'YYYY-MM-DD')
        : '';
    return (
        <div className="form-group">
            <label>Return date and hour:</label>
            <div className="input-group">
                <input
                    type="date"
                    id="return_date"
                    name="return_date"
                    min={minReturnDate !== '' ? minReturnDate : getMinDateReturn()}
                    className="form-control"
                    required
                    onChange={(event) => props.setReturnDate(new Date(event.target.value))}
                />
                <input
                    type="time"
                    id="return_hour"
                    name="return_hour"
                    className="form-control"
                    required
                    onChange={(event) => props.setReturnHour(parseInt(event.target.value))}
                />
            </div>
        </div>
    );
}
