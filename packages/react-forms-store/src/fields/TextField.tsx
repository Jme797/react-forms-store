import {ValidationResult} from '../validation/Validator';
import {Field, FieldOptions} from './Field';

export type TextFieldOptions = Omit<FieldOptions<string>, 'initValue'> & {
    initValue?: string;
};

export class TextField extends Field<string> {
    constructor(options: TextFieldOptions) {
        super({...options, initValue: options.initValue ?? ''});
    }

    /**
     * Checks if the field has a value.
     * @returns {boolean} True if the field has a non-empty string value, false otherwise.
     */
    hasValue = (): boolean => {
        return this._value.trim().length > 0;
    };

    /**
     * Sets the value of the field.
     * @param {string | ((curr: string) => string)} value - The value to set or a function to compute the new value.
     */
    setValue = (value: string | ((curr: string) => string)): void => {
        if (value instanceof Function) {
            this._value = value(this.value);
        } else {
            this._value = value;
        }
        this.dirty = true;
        this.triggerSubscribers();
        this.dismissErrors();
    };

    /**
     * Gets the current value of the field.
     * @returns {string} The current value of the field.
     */
    getValue = (): string => {
        return this.value;
    };

    /**
     * Validates the field.
     * @returns {Promise<ValidationResult>} The validation result.
     */
    validate = async (): Promise<ValidationResult> => {
        this._errors = await this.validator.validate(this);
        this.triggerSubscribers();
        return this._errors;
    };
}
