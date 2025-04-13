import {Field, FieldOptions} from '../Field/Field';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ListField<T = any> extends Field<T[]> {
    constructor({
        initValue = [],
        ...fieldOptions
    }: Omit<FieldOptions<T[]>, 'initValue'> & {initValue?: T[]}) {
        super({initValue, ...fieldOptions});
    }

    /**
     * Adds a value to the list.
     * @param {T} value - The value to add.
     */
    addValue(value: T): void {
        this.setValue([...this.value, value]);
    }

    /**
     * Deletes a value at a specific index in the list.
     * @param {number} index - The index of the value to delete.
     */
    deleteValueAt(index: number): void {
        const newValue = [...this.value];
        newValue.splice(index, 1);
        this.setValue(newValue);
    }

    /**
     * Updates a value at a specific index in the list.
     * @param {number} index - The index of the value to update.
     * @param {T} value - The new value to set.
     */
    updateValueAt(index: number, value: T): void {
        const newValue = [...this.value];
        newValue[index] = value;
        this.setValue(newValue);
    }

    /**
     * Clears all values in the list.
     */
    clear(): void {
        this.setValue([]);
    }
}
