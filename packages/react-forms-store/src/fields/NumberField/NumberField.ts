import {Field, FieldOptions} from '../Field';

export type NumberFieldOptions = FieldOptions<number | undefined> & {
    min?: number;
    max?: number;
    step?: number;
};

export class NumberField extends Field<number | undefined> {
    min?: number;
    max?: number;
    step?: number;

    constructor(options: NumberFieldOptions) {
        const defaultValidation = [
            {
                rule: (value: number | undefined) => {
                    if (value === undefined) return true;
                    if (options.min !== undefined && value < options.min) {
                        return false;
                    }
                    if (options.max !== undefined && value > options.max) {
                        return false;
                    }
                    return true;
                },
                error: `Value must be between ${options.min} and ${options.max}.`,
            },
        ];

        super({
            label: options.label,
            initValue: options.initValue,
            required: options.required,
            validation: [...defaultValidation, ...(options.validation || [])],
        });

        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
    }
}
