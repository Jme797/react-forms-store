import {ColorResult, SketchPicker} from 'react-color';

import React, {useRef, useState} from 'react';

import {ColorField} from 'react-forms-store';

import {
    ClickAwayListener,
    FormControl,
    FormHelperText,
    Popper,
    TextField,
} from '@mui/material';

import {useField} from '../utils';

type ColorPickerProps = {
    field: ColorField;
};

const ColorPicker: React.FC<ColorPickerProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (color: ColorResult) => {
        let colorValue: string;
        switch (field.format) {
            case 'rgb':
                colorValue = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
                break;
            case 'rgba':
                colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
                break;
            case 'hsl':
                colorValue = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
                break;
            case 'hsla':
                colorValue = `hsla(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%, ${color.hsl.a})`;
                break;
            case 'hex':
            default:
                colorValue = color.hex;
                break;
        }
        field.setValue(colorValue);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setAnchorEl(event.currentTarget);
        setTimeout(() => setOpen(true), 0); // Delay activation of ClickAwayListener
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    return (
        <FormControl fullWidth error={hasErrors}>
            <ClickAwayListener onClickAway={handleClose}>
                <div>
                    <TextField
                        fullWidth
                        label={field.label}
                        value={value || ''}
                        onChange={e => field.setValue(e.target.value)}
                        onFocus={handleFocus}
                        inputRef={inputRef}
                        InputProps={{
                            endAdornment: (
                                <div
                                    style={{
                                        width: 36,
                                        height: 36,
                                        backgroundColor: value || '#fff',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            ),
                        }}
                    />
                    <div>
                        <Popper open={open} anchorEl={anchorEl}>
                            <SketchPicker
                                color={value || '#fff'}
                                onChange={handleChange}
                            />
                        </Popper>
                    </div>
                </div>
            </ClickAwayListener>
            {hasErrors && <FormHelperText>{errors.join(', ')}</FormHelperText>}
        </FormControl>
    );
};

export default ColorPicker;
