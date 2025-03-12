import React from 'react';

import {TextField as CustomTextField} from 'react-forms-store';

import {TextField as MuiTextField} from '@mui/material';

import {useField} from '../utils';

type EmailInputProps = {
    field: CustomTextField;
};

const EmailInput: React.FC<EmailInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        field.setValue(event.target.value);
    };

    return (
        <MuiTextField
            label={field.label}
            type="email"
            value={value}
            onChange={handleChange}
            error={hasErrors}
            helperText={hasErrors ? errors.join(', ') : field.helpText}
            fullWidth
        />
    );
};

export default EmailInput;
