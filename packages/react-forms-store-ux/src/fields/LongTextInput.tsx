import React from 'react';

import {TextField as CustomTextField} from 'react-forms-store';

import {TextField as MuiTextField} from '@mui/material';

import {useField} from '../utils';

type LongTextInputProps = {
    field: CustomTextField;
};

const LongTextInput: React.FC<LongTextInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        field.setValue(event.target.value);
    };

    return (
        <MuiTextField
            label={field.label}
            value={value}
            onChange={handleChange}
            error={hasErrors}
            helperText={hasErrors ? errors.join(', ') : field.helpText}
            fullWidth
            multiline
            rows={4}
        />
    );
};

export default LongTextInput;
