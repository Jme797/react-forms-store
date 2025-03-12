import {Form} from '../../forms/Form';
import {
    ValidationResult,
    Validator,
    ValidatorError,
} from '../../validation/Validator';
import {v4 as uuidv4} from 'uuid';

export type FieldOptions<v> = {
    label: string;
    initValue?: v;
    defaultValue?: v;
    validation?: Validator<Field<v>>['rules'];
    required?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    testId?: string;
    helpText?: string;
};

export type Option<v> = {value: v; label: string};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Field<v = any, F extends Form<any> = Form<any>> {
    protected _errors: ValidationResult = new ValidationResult({success: true});
    protected _value: v;

    disabled: boolean;
    dirty: boolean;

    savedValue: v;
    readonly defaultValue: v;

    readonly name: string;
    readonly label: string;
    readonly testId?: string;
    readonly helpText?: string;

    readonly required: boolean = false;
    readonly readonly: boolean;
    readonly subscribers: Set<() => void> = new Set();
    readonly validator: Validator<Field<v>> = new Validator<Field<v>>();

    form?: F;

    constructor({
        initValue,
        label,
        required = false,
        validation = [],
        disabled = false,
        readonly = false,
        testId,
        helpText,
        defaultValue,
    }: Omit<FieldOptions<v>, 'initValue'> & {initValue: v}) {
        this._value = initValue;
        this.label = label;
        this.name = 'id' + uuidv4();
        this.validator.rules = validation;
        this.required = required;
        this.savedValue = initValue;
        this.disabled = disabled;
        this.readonly = readonly;
        this.dirty = false;
        this.testId = testId;
        this.helpText = helpText;
        this.defaultValue = defaultValue || initValue;
    }

    /**
     * Gets the current value of the field.
     * @returns {v} The current value of the field.
     */
    get ['value']() {
        return this._value;
    }

    /**
     * Gets the current validation errors of the field.
     * @returns {ValidationResult} The current validation errors of the field.
     */
    get ['errors']() {
        return this._errors;
    }

    /**
     * Checks if the field has a value.
     * @returns {boolean} True if the field has a value, false otherwise.
     */
    hasValue = (): boolean => {
        return Boolean(this._value);
    };

    /**
     * Checks if the field is required.
     * @returns {boolean} True if the field is required, false otherwise.
     */
    isRequired = (): boolean => {
        return this.required;
    };

    /**
     * Saves the current value of the field.
     */
    saveValue = (): void => {
        this.savedValue = this.value;
        this.dirty = false;
        this.triggerSubscribers();
    };

    /**
     * Sets the disabled state of the field.
     * @param {boolean} isDisabled - The disabled state to set.
     */
    setDisabled = (isDisabled: boolean): void => {
        this.disabled = isDisabled;
        this.triggerSubscribers();
    };

    /**
     * Dismisses the current validation errors of the field.
     */
    dismissErrors = (): void => {
        this._errors = new ValidationResult({success: true});
        this.triggerSubscribers();
    };

    /**
     * Raises validation errors for the field.
     * @param {string[]} errors - The validation errors to raise.
     * @returns {ValidationResult} The validation result with the raised errors.
     */
    raiseErrors = (errors: string[]): ValidationResult => {
        this._errors = new ValidationResult({
            success: false,
            errors: errors.map(error => new ValidatorError(error)),
            field: this as Field,
        });
        this.triggerSubscribers();
        return this._errors;
    };

    /**
     * Sets the value of the field.
     * @param {v | ((curr: v) => v)} value - The value to set or a function to compute the new value.
     */
    setValue = (value: v | ((curr: v) => v)): void => {
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
     * Resets the field to its saved value.
     */
    reset = (): void => {
        this.dirty = false;
        this._value = this.savedValue;
        this.dismissErrors();
        this.triggerSubscribers();
    };

    /**
     * Resets the field to its default value.
     */
    resetToDefaultValue = (): void => {
        this._value = this.defaultValue;
        this.dismissErrors();
        this.triggerSubscribers();
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

    /**
     * Triggers all subscriber callbacks.
     */
    triggerSubscribers = (): void => {
        this.subscribers.forEach(callback => callback());
    };

    /**
     * Subscribes a callback to be triggered on field updates.
     * @param {() => void} callback - The callback to subscribe.
     * @returns {() => void} A function to unsubscribe the callback.
     */
    subscribe = (callback: () => void): (() => void) => {
        this.subscribers.add(callback);
        return () => {
            this.subscribers.delete(callback)
        };
    };
}
