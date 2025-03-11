import {Field, FieldOptions} from '../Field';

type FileFieldOptions = FieldOptions<File | undefined>;

export class FileField extends Field<File | undefined> {
    constructor(options: FileFieldOptions) {
        super({
            label: options.label,
            initValue: options.initValue,
            required: options.required,
            validation: options.validation,
        });
    }
}
