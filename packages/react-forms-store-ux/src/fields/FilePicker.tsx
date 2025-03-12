import React, {useRef} from 'react';

import {FileField, MultipleFileField} from 'react-forms-store';

import {Button, FormControl, FormHelperText} from '@mui/material';

import {useField} from '../utils';

type FilePickerProps<T> = {
    field: T;
};

const FilePicker = <T extends FileField | MultipleFileField>({
    field,
}: FilePickerProps<T>) => {
    const {value, errors, hasErrors} = useField<T>(field);
    const inputId = `file-input-${field.name}`;
    const inputRef = useRef<HTMLInputElement>(null);

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

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <div>
                <Button
                    variant="contained"
                    component="span"
                    onClick={handleButtonClick}
                >
                    {field.label}
                </Button>
            </div>
            <input
                id={inputId}
                ref={inputRef}
                type="file"
                hidden
                multiple={field instanceof MultipleFileField}
                onChange={handleChange}
            />
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
