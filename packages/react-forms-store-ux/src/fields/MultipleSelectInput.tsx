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

    const handleChange = (event: SelectChangeEvent<T['id'][]>) => {
        const value = event.target.value;
        const selected = typeof value === 'string' ? undefined : value;

        field.setValue(
            field.choices.filter(choice => selected?.includes(choice.id))
        );
    };

    const renderValue = (selected: T['id'][]) => {
        return selected.join(', ');
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <InputLabel>{field.label}</InputLabel>
            <Select<T['id'][]>
                multiple
                value={value.map(i => i.id)}
                onChange={handleChange}
                renderValue={renderValue}
            >
                {field.choices.map(choice => (
                    <MenuItem key={choice.id} value={choice.id}>
                        {choice.label}
                    </MenuItem>
                ))}
            </Select>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default MultipleSelectInput;
