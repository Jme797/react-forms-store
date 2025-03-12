import {DateTime} from 'luxon';

import React from 'react';

import {DateField} from 'react-forms-store';

import {FormControl, FormHelperText, Typography} from '@mui/material';
import {DateCalendar, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';

import {useField} from '../utils';

type DateCalendarInputProps = {
    field: DateField;
};

const DateCalendarInput: React.FC<DateCalendarInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (date: DateTime | null) => {
        field.setValue(date?.toJSDate());
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <div>
                    <Typography variant="caption">{field.label}</Typography>
                    <DateCalendar
                        sx={{m: 0}}
                        value={value ? DateTime.fromJSDate(value) : null}
                        onChange={handleChange}
                        minDate={field.min && DateTime.fromJSDate(field.min)}
                        maxDate={field.max && DateTime.fromJSDate(field.max)}
                    />
                </div>
            </LocalizationProvider>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default DateCalendarInput;
