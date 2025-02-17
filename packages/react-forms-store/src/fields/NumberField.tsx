import {Field, FieldOptions} from './Field';

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
        super({
            label: options.label,
            initValue: options.initValue,
            required: options.required,
            validation: options.validation,
        });

        this.min = options.min;
        this.max = options.max;
        this.step = options.step;
    }
}
