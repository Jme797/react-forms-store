import {MultipleChoiceField, OptionBase, useField} from 'react-forms-store';

import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

type MultipleSelectInputProps<T extends OptionBase> = {
    field: MultipleChoiceField<T>;
};

const MultipleSelectInput = <T extends OptionBase>({
    field,
}: MultipleSelectInputProps<T>) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: SelectChangeEvent<T[]>) => {
        const value = event.target.value;
        const selected = typeof value === 'string' ? value.split(',') : value;
        field.setValue(
            selected.map(
                id =>
                    field.choices.find(
                        choice => String(choice.id) === String(id)
                    )!
            )
        );
    };

    const renderValue = (selected: unknown) => {
        return (selected as (string | number)[])
            .map(id => field.choices.find(choice => choice.id === id)?.id)
            .join(', ');
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <InputLabel>{field.label}</InputLabel>
            <Select<T[]>
                multiple
                value={value}
                onChange={handleChange}
                renderValue={renderValue}
            >
                {field.choices.map(choice => (
                    <MenuItem key={choice.id} value={choice.id}>
                        {choice.id}
                    </MenuItem>
                ))}
            </Select>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default MultipleSelectInput;
