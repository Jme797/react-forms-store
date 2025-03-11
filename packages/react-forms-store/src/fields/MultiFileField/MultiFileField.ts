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
}
