import {DateTime} from 'luxon';

import React from 'react';

import {DateField} from 'react-forms-store';

import {FormControl, FormHelperText} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon/AdapterLuxon';

import {useField} from '../utils';

type DatePickerInputProps = {
    field: DateField;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (date: DateTime | null) => {
        field.setValue(date?.toJSDate());
    };

    console.log(field.min);
    console.log(field.max);

    return (
        <FormControl fullWidth error={hasErrors}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker
                    label={field.label}
                    value={value ? DateTime.fromJSDate(value) : null}
                    onChange={handleChange}
                    {...{views: ['year', 'month', 'day']}}
                    minDate={field.min && DateTime.fromJSDate(field.min)}
                    maxDate={field.max && DateTime.fromJSDate(field.max)}
                />
            </LocalizationProvider>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default DatePickerInput;
