import useField from 'react-forms-store/src/utils/useField';

import React from 'react';

import {NumberField} from 'react-forms-store';

import {TextField as MuiTextField} from '@mui/material';

type NumberInputProps = {
    field: NumberField;
};

const NumberInput: React.FC<NumberInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        field.setValue(
            event.target.value ? Number(event.target.value) : undefined
        );
    };

    return (
        <MuiTextField
            label={field.label}
            type="number"
            value={value ?? ''}
            onChange={handleChange}
            error={hasErrors}
            helperText={hasErrors ? errors.join(', ') : field.helpText}
            InputProps={{
                inputProps: {
                    max: field.max,
                    min: field.min,
                    step: field.step,
                },
            }}
            fullWidth
        />
    );
};

export default NumberInput;
