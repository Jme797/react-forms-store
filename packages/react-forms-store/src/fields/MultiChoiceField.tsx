import {Field, FieldOptions} from './Field';

type BaseType = {id: string | number};

type MultipleChoiceFieldOptions<T> = FieldOptions<T[]> & {
    choices: T[];
};

export class MultipleChoiceField<T extends BaseType> extends Field<T[]> {
    choices: T[];

    constructor(options: MultipleChoiceFieldOptions<T>) {
        super({
            label: options.label,
            initValue: options.initValue || [],
            required: options.required,
            validation: options.validation,
        });

        this.choices = options.choices;
    }

    addValueById(id: string | number) {
        const item = this.choices.find(choice => choice.id === id);
        if (item && !this.value.some(v => v.id === id)) {
            this.setValue([...this.value, item]);
        }
    }

    removeValueById(id: string | number) {
        this.setValue(this.value.filter(v => v.id !== id));
    }
}
