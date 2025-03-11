import {Field, FieldOptions} from '../Field';

type MultipleFileFieldOptions = FieldOptions<File[]>;

export class MultipleFileField extends Field<File[]> {
    constructor(options: MultipleFileFieldOptions) {
        super({
            label: options.label,
            initValue: options.initValue ?? [],
            required: options.required,
            validation: options.validation,
        });
    }

    /**
     * Checks if the field has any selected values.
     * @returns {boolean} True if the field has one or more selected values, false otherwise.
     */
    hasValue = (): boolean => {
        return this.value.length > 0;
    };
}
