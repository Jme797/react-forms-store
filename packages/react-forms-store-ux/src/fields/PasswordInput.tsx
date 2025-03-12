import React, {useState} from 'react';

import {TextField} from 'react-forms-store';

import {Visibility, VisibilityOff} from '@mui/icons-material';
import {
    IconButton,
    InputAdornment,
    TextField as MuiTextField,
} from '@mui/material';

import {useField} from '../utils';

type PasswordInputProps = {
    field: TextField;
};

const PasswordInput: React.FC<PasswordInputProps> = ({field}) => {
    const [showPassword, setShowPassword] = useState(false);
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        field.setValue(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(curr => !curr);
    };

    return (
        <MuiTextField
            label={field.label}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={handleChange}
            error={hasErrors}
            helperText={hasErrors ? errors.join(', ') : field.helpText}
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordInput;
