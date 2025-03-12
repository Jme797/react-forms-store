import React from 'react';

import {MultipleChoiceField, OptionBase} from 'react-forms-store';

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
} from '@mui/material';

import {useField} from '../utils';

type CheckboxGroupProps<T extends OptionBase> = {
    field: MultipleChoiceField<T>;
};

const CheckboxGroup = <T extends OptionBase>({
    field,
}: CheckboxGroupProps<T>) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = event.target.value;
        const isChecked = event.target.checked;

        const actaualId = field.choices.find(
            choice => String(choice.value) === selectedId
        )!.value;

        if (isChecked) {
            field.addValueByValue(actaualId);
        } else {
            field.removeValueByValue(actaualId);
        }
    };

    return (
        <FormControl fullWidth component="fieldset" error={hasErrors}>
            <FormGroup>
                {field.choices.map(choice => (
                    <FormControlLabel
                        key={choice.value}
                        control={
                            <Checkbox
                                checked={value.some(
                                    item => item.value === choice.value
                                )}
                                onChange={handleChange}
                                value={choice.value}
                            />
                        }
                        label={choice.label}
                    />
                ))}
            </FormGroup>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default CheckboxGroup;
