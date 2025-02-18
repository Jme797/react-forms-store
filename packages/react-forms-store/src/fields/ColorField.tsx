import {Field, FieldOptions} from './Field';
import {isHSL, isHexColor, isRgbColor} from 'validator';

type ColorFieldOptions = FieldOptions<string> & {
    format?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
};

export class ColorField extends Field<string> {
    format: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

    constructor(options: ColorFieldOptions) {
        const format = options.format ?? 'hex'; // Default to 'hex' if not provided

        const defaultValidation = [
            {
                rule: (value: string) => ColorField.isValidColor(value, format),
                error: `Invalid color format. Expected ${format}.`,
            },
        ];

        super({
            label: options.label,
            initValue: options.initValue || '',
            required: options.required,
            validation: [...defaultValidation, ...(options.validation || [])],
        });

        this.format = format;
    }

    private static isValidColor(value: string, format: string): boolean {
        switch (format) {
            case 'hex':
                return isHexColor(value);
            case 'rgb':
                return isRgbColor(value);
            case 'rgba':
                return isRgbColor(value); // isRgbColor also validates rgba
            case 'hsl':
                return isHSL(value);
            case 'hsla':
                return isHSL(value); // isHSL also validates hsla
            default:
                return false;
        }
    }
}
