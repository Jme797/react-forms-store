import React from 'react';

import {ChoiceField, OptionBase} from 'react-forms-store';

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
} from '@mui/material';

import {useField} from '../utils';

type RadioGroupInputProps<T extends OptionBase> = {
    field: ChoiceField<T>;
};

const RadioGroupInput = <T extends OptionBase>({
    field,
}: RadioGroupInputProps<T>) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;

        const item = field.choices.find(
            choice => String(choice.value) === String(selectedValue)
        );

        field.setValue(item!);
    };

    return (
        <FormControl fullWidth component="fieldset" error={hasErrors}>
            <RadioGroup value={value?.value} onChange={handleChange}>
                {field.choices.map(choice => (
                    <FormControlLabel
                        key={choice.value}
                        value={choice.value}
                        control={<Radio />}
                        label={choice.label}
                    />
                ))}
            </RadioGroup>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default RadioGroupInput;
