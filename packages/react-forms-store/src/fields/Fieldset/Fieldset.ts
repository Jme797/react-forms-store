/* istanbul ignore file */

import {ValidationResult} from '../../validation/Validator';
import {Field} from '../Field/Field';

export type FieldsetValue<TFields> = {
    [K in keyof TFields]: TFields[K] extends Field<infer V> ? V : never;
};

export class Fieldset<TFields extends Record<string, Field>> extends Field<
    FieldsetValue<TFields>
> {
    readonly fields: TFields;

    constructor(fields: TFields) {
        super({
            initValue: Fieldset.computeInitialValue(fields),
            label: 'Fieldset',
        });
        this.fields = fields;

        // Subscribe to child fields to update the fieldset value
        Object.values(this.fields).forEach(field => {
            field.subscribe(() => this.updateValue());
        });
    }

    /**
     * Computes the initial value of the fieldset based on its child fields.
     * @param {TFields} fields - The child fields.
     * @returns {FieldsetValue<TFields>} The initial value.
     */
    private static computeInitialValue<TFields extends Record<string, Field>>(
        fields: TFields
    ): FieldsetValue<TFields> {
        const value: Partial<FieldsetValue<TFields>> = {};
        for (const key in fields) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            value[key] = fields[key].value;
        }
        return value as FieldsetValue<TFields>;
    }

    /**
     * Updates the value of the fieldset based on its child fields.
     */
    private updateValue(): void {
        const newValue = Fieldset.computeInitialValue(this.fields);
        this._value = newValue;
    }

    /**
     * Validates all child fields and updates the fieldset's validation state.
     * @returns {Promise<ValidationResult>} True if all child fields are valid, false otherwise.
     */
    validate = async (): Promise<ValidationResult> => {
        const results = await Promise.all(
            Object.values(this.fields).map(field => field.validate())
        );
        const hasErrors = results.some(result => !result.success);
        const result = hasErrors
            ? {success: false, errors: []}
            : {success: true};
        this.triggerSubscribers();

        return new ValidationResult(result);
    };

    /**
     * Resets all child fields to their saved values and updates the fieldset value.
     */
    reset = (): void => {
        // Reset each child field
        Object.values(this.fields).forEach(field => field.reset());

        // Update the fieldset's value based on the child fields
        this._value = Fieldset.computeInitialValue(this.fields);

        // Mark the fieldset as not dirty
        this.dirty = false;

        // Dismiss any existing errors
        this.dismissErrors();

        // Notify subscribers of the change
        this.triggerSubscribers();
    };

    /**
     * Resets all child fields to their default values and updates the fieldset value.
     */
    resetToDefault = (): void => {
        // Reset each child field to its default value
        Object.values(this.fields).forEach(field =>
            field.resetToDefaultValue()
        );

        // Update the fieldset's value based on the child fields
        this._value = Fieldset.computeInitialValue(this.fields);

        // Mark the fieldset as not dirty
        this.dirty = false;

        // Dismiss any existing errors
        this.dismissErrors();

        // Notify subscribers of the change
        this.triggerSubscribers();
    };

    /**
     * Sets the value of the fieldset and updates child fields only if their values have changed.
     * @param {FieldsetValue<TFields>} value - The new value for the fieldset.
     */
    setValue = (
        value:
            | FieldsetValue<TFields>
            | ((curr: FieldsetValue<TFields>) => FieldsetValue<TFields>)
    ): void => {
        const newValue = value instanceof Function ? value(this.value) : value;

        // Update each child field only if its value has changed
        Object.keys(newValue).forEach(key => {
            const field = this.fields[key];
            const newFieldValue = newValue[key];
            field.setValue(newFieldValue);
        });

        // Update the fieldset's internal value
        this._value = Fieldset.computeInitialValue(this.fields);

        // Mark the fieldset as dirty
        this.dirty = true;

        // Notify subscribers of the change
        this.triggerSubscribers();
    };
}
