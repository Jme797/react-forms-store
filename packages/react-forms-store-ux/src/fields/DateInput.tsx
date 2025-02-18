import useField from 'react-forms-store/src/utils/useField';

import React from 'react';

import {DateField} from 'react-forms-store';

import {FormControl, FormHelperText, TextField} from '@mui/material';

type DateInputProps = {
    field: DateField;
};

const DateInput: React.FC<DateInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        field.setValue(newValue ? new Date(newValue) : undefined);
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <TextField
                label={field.label}
                type={field.dateTime ? 'datetime-local' : 'date'}
                value={
                    value
                        ? field.dateTime
                            ? value.toISOString().slice(0, 16)
                            : value.toISOString().split('T')[0]
                        : ''
                }
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default DateInput;
