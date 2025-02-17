import {Field, FieldOptions} from './Field';

export type OptionBase = {id: string | number, label: string};

export type ChoiceFieldOptions<T> = FieldOptions<T | undefined> & {
    choices: T[];
};

export class ChoiceField<T extends OptionBase> extends Field<
    T | undefined
> {
    choices: T[];

    constructor(options: ChoiceFieldOptions<T>) {
        super({
            label: options.label,
            initValue: options.initValue,
            required: options.required,
            validation: options.validation,
        });

        this.choices = options.choices;
    }
}
