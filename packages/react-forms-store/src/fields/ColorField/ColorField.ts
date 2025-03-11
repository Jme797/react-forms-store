import { Field, FieldOptions } from '../Field';

export type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

export type ColorFieldOptions = FieldOptions<string> & {
    format?: ColorFormat;
};

export class ColorField extends Field<string> {
    format: ColorFormat;

    constructor(options: ColorFieldOptions) {
        const format: ColorFormat = options.format ?? 'hex'; // Default to 'hex' if not provided

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

    static isValidColor(value: string, format: ColorFormat): boolean {
        switch (format) {
            case 'hex':
                return /^#[0-9A-F]{6}$/i.test(value);
            case 'rgb':
                return /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.test(value);
            case 'rgba':
                return /^rgba\((\d{1,3}), (\d{1,3}), (\d{1,3}), (0|1|0?\.\d+)\)$/.test(value);
            case 'hsl':
                return /^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/.test(value);
            case 'hsla':
                return /^hsla\(\d{1,3}, \d{1,3}%, \d{1,3}%, (0|1|0?\.\d+)\)$/.test(value);
        }
    }
}
