import React from 'react';

import {MultipleChoiceField, OptionBase, useField} from 'react-forms-store';

import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
} from '@mui/material';

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
            choice => String(choice.id) === selectedId
        )!.id;

        if (isChecked) {
            field.addValueById(actaualId);
        } else {
            field.removeValueById(actaualId);
        }
    };

    return (
        <FormControl fullWidth component="fieldset" error={hasErrors}>
            <FormGroup>
                {field.choices.map(choice => (
                    <FormControlLabel
                        key={choice.id}
                        control={
                            <Checkbox
                                checked={value.some(
                                    item => item.id === choice.id
                                )}
                                onChange={handleChange}
                                value={choice.id}
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
