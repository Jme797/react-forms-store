/* istanbul ignore file */

import {Field} from '../Field/Field';
import {Fieldset, FieldsetValue} from '../Fieldset';

type FieldsetListValue<TFields> = Array<FieldsetValue<TFields>>;

export class FieldsetList<TFields extends Record<string, Field>> extends Field<
    FieldsetListValue<TFields>
> {
    readonly items: Array<Fieldset<TFields>>;
    private readonly fieldsetFactory: () => TFields;

    constructor(
        fieldsetFactory: () => TFields,
        initialValues: Array<FieldsetValue<TFields>> = []
    ) {
        const fieldsets = initialValues.map(value => {
            const fields = fieldsetFactory();
            Object.keys(fields).forEach(key => {
                if (fields[key]) {
                    fields[key].setValue(
                        value[key as keyof FieldsetValue<TFields>]
                    );
                }
            });
            return new Fieldset(fields);
        });

        super({
            initValue: fieldsets.map(fieldset => fieldset.value),
            label: 'Fieldset List',
        });

        this.items = fieldsets;
        this.fieldsetFactory = fieldsetFactory;

        // Subscribe to each fieldset to update the list value
        this.items.forEach(fieldset => {
            fieldset.subscribe(() => this.updateValue());
        });
    }

    /**
     * Adds a new fieldset to the list using the fieldset factory.
     */
    add(): void {
        const newFieldset = new Fieldset(this.fieldsetFactory());
        newFieldset.subscribe(() => this.updateValue());
        this.items.push(newFieldset);
        this.updateValue();
    }

    /**
     * Removes a fieldset from the list by index.
     * @param {number} index - The index of the fieldset to remove.
     */
    remove(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.updateValue();
        }
    }

    /**
     * Updates the value of the list based on its fieldsets.
     */
    private updateValue(): void {
        const newValue = this.items.map(fieldset => fieldset.value);
        this.setValue(newValue);
    }

    /**
     * Resets all fieldsets in the list to their saved values.
     */
    reset = (): void => {
        this.items.forEach(fieldset => fieldset.reset());
        this.updateValue();
    };

    /**
     * Resets all fieldsets in the list to their default values.
     */
    resetToDefault = (): void => {
        this.items.forEach(fieldset => fieldset.resetToDefault());
        this.updateValue();
    };
}
