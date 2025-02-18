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

    const handleChange = (event: SelectChangeEvent<T['value'][]>) => {
        const value = event.target.value;
        const selected = typeof value === 'string' ? undefined : value;

        field.setValue(
            field.choices.filter(choice => selected?.includes(choice.value))
        );
    };

    const renderValue = (selected: T['value'][]) => {
        return selected.join(', ');
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <InputLabel>{field.label}</InputLabel>
            <Select<T['value'][]>
                multiple
                value={value.map(i => i.value)}
                onChange={handleChange}
                renderValue={renderValue}
            >
                {field.choices.map(choice => (
                    <MenuItem key={choice.value} value={choice.value}>
                        {choice.label}
                    </MenuItem>
                ))}
            </Select>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default MultipleSelectInput;
