import {OptionBase} from '../ChoiceField';
import {Field, FieldOptions} from '../Field';

type MultipleChoiceFieldOptions<T> = FieldOptions<T[]> & {
    choices: T[];
};

export class MultipleChoiceField<T extends OptionBase> extends Field<T[]> {
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

    addValueByValue(value: string | number) {
        const item = this.choices.find(choice => choice.value === value);
        if (item && !this.value.some(v => v.value === value)) {
            this.setValue([...this.value, item]);
        }
    }

    removeValueByValue(value: string | number) {
        this.setValue(this.value.filter(v => v.value !== value));
    }

    /**
     * Checks if the field has any selected values.
     * @returns {boolean} True if the field has one or more selected values, false otherwise.
     */
    hasValue = (): boolean => {
        return this.value.length > 0;
    };
}
