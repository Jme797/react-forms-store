import useField from 'react-forms-store/src/utils/useField';

import React from 'react';

import {FileField, MultipleFileField} from 'react-forms-store';

import {Button, FormControl, FormHelperText} from '@mui/material';

type FilePickerProps<T> = {
    field: T;
};

const FilePicker = <T extends FileField | MultipleFileField>({
    field,
}: FilePickerProps<T>) => {
    const {value, errors, hasErrors} = useField<T>(field);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (field instanceof MultipleFileField) {
            field.setValue(
                event.target.files ? Array.from(event.target.files) : []
            );
        } else {
            field.setValue(
                event.target.files ? event.target.files[0] : undefined
            );
        }
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <Button variant="contained" component="label">
                {field.label}
                <input
                    type="file"
                    hidden
                    multiple={field instanceof MultipleFileField}
                    onChange={handleChange}
                />
            </Button>
            {value && (
                <div>
                    {value instanceof Array
                        ? value.map((file, index) => (
                              <div key={index}>{file.name}</div>
                          ))
                        : value.name}
                </div>
            )}
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default FilePicker;
