import {Field, FieldOptions} from '../Field';

export type TextFieldOptions = Omit<FieldOptions<string>, 'initValue'> & {
    initValue?: string;
};

export class TextField extends Field<string> {
    constructor(options: TextFieldOptions) {
        super({
            ...options,
            initValue: options.initValue ?? '',
        });
    }

    /**
     * Checks if the field has a value.
     * @returns {boolean} True if the field has a non-empty string value, false otherwise.
     */
    hasValue = (): boolean => {
        return this._value.trim().length > 0;
    };
}
