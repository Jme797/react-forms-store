import {useSyncExternalStore} from 'use-sync-external-store/shim';

import React from 'react';

import {TextField as CustomTextField} from 'react-forms-store';

import {TextField as MuiTextField} from '@mui/material';

type TextInputProps = {
    field: CustomTextField;
};

const TextInput: React.FC<TextInputProps> = ({field}) => {
    const value = useSyncExternalStore(field.subscribe, () => field.value);
    const errors = useSyncExternalStore(field.subscribe, () => field.errors);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        field.setValue(event.target.value);
    };

    return (
        <MuiTextField
            label={field.label}
            value={value}
            onChange={handleChange}
            error={!errors.success}
            helperText={
                !errors.success
                    ? errors.errors?.map(error => error.msg).join(', ')
                    : field.helpText
            }
            fullWidth
        />
    );
};

export default TextInput;
