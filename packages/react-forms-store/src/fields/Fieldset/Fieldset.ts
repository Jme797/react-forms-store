/* istanbul ignore file */

import {ValidationResult} from '../../validation/Validator';
import {Field} from '../Field/Field';

type FieldsetValue<TFields> = {
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
        this.setValue(newValue);
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
     * Overrides the setValue method to propagate the value to child fields.
     * @param {FieldsetValue<TFields> | ((curr: FieldsetValue<TFields>) => FieldsetValue<TFields>)} value - The new value for the fieldset or a function to compute it.
     */
    setValue = (
        value:
            | FieldsetValue<TFields>
            | ((curr: FieldsetValue<TFields>) => FieldsetValue<TFields>)
    ): void => {
        const newValue = value instanceof Function ? value(this.value) : value;

        // Set the value for each child field
        for (const key in newValue) {
            if (this.fields[key]) {
                this.fields[key].setValue(newValue[key]);
            }
        }

        // Update the fieldset's internal value
        this._value = newValue;

        // Mark the fieldset as dirty
        this.dirty = true;

        // Dismiss any existing errors
        this.dismissErrors();

        // Notify subscribers of the change
        this.triggerSubscribers();
    };
}
