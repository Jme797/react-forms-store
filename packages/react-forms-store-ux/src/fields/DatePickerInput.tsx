import {DateTime} from 'luxon';
import useField from 'react-forms-store/src/utils/useField';

import React from 'react';

import {DateField} from 'react-forms-store';

import {FormControl, FormHelperText} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon/AdapterLuxon';

type DatePickerInputProps = {
    field: DateField;
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (date: Date | null) => {
        field.setValue(date ?? undefined);
    };

    console.log(field.min);
    console.log(field.max);

    return (
        <FormControl fullWidth error={hasErrors}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
                <DatePicker
                    label={field.label}
                    value={value ?? null}
                    onChange={handleChange}
                    {...{views: ['year', 'month', 'day']}}
                    minDate={DateTime.fromJSDate(field.min)}
                    maxDate={DateTime.fromJSDate(field.max)}
                />
            </LocalizationProvider>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default DatePickerInput;
