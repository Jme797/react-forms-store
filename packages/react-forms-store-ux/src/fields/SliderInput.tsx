import React from 'react';

import {NumberField} from 'react-forms-store';

import {Slider, Typography} from '@mui/material';

import {useField} from '../utils';

type SliderInputProps = {
    field: NumberField;
};

const SliderInput: React.FC<SliderInputProps> = ({field}) => {
    const {value, errors, hasErrors} = useField(field);

    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            field.setValue(newValue);
        }
    };

    return (
        <div>
            <Slider
                value={value ?? 0}
                onChange={handleSliderChange}
                min={field.min}
                max={field.max}
                step={field.step}
                aria-labelledby="input-slider"
            />
            {hasErrors && (
                <Typography color="error" variant="body2">
                    {errors.join(', ')}
                </Typography>
            )}
        </div>
    );
};

export default SliderInput;
