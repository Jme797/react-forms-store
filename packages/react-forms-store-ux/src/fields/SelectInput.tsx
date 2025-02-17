import {ChoiceField, OptionBase, useField} from 'react-forms-store';

import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

type SelectInputProps<T extends OptionBase> = {
    field: ChoiceField<T>;
};

const SelectInput = <T extends OptionBase>({field}: SelectInputProps<T>) => {
    const {value, errors, hasErrors} = useField(field);

    const handleChange = (event: SelectChangeEvent<unknown>) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        field.setValue(
            field.choices.find(
                choice => String(choice.id) === String(selectedValue)
            )!
        );
    };

    const renderValue = (selected: T) => {
        return selected.id;
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <InputLabel>{field.label}</InputLabel>
            <Select
                value={value}
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

export default SelectInput;
