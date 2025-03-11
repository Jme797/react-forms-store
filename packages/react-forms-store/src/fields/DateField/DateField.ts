import {Field, FieldOptions} from '../Field';

type DateFieldOptions = FieldOptions<Date | undefined> & {
    min?: Date;
    max?: Date;
    dateTime?: boolean; // New option to specify if the field is a DateTime field
};

export class DateField extends Field<Date | undefined> {
    min?: Date;
    max?: Date;
    dateTime: boolean;

    constructor(options: DateFieldOptions) {
        super({
            label: options.label,
            initValue: options.initValue,
            required: options.required,
            validation: [
                ...(options.validation || []),
                {
                    rule: value =>
                        !options.min || !value || value >= options.min,
                    error: `Date must be on or after ${options.min?.toLocaleDateString()}.`,
                },
                {
                    rule: value =>
                        !options.max || !value || value <= options.max,
                    error: `Date must be on or before ${options.max?.toLocaleDateString()}.`,
                },
            ],
        });

        this.min = options.min;
        this.max = options.max;
        this.dateTime = options.dateTime ?? false; // Default to false if not provided
    }
}
