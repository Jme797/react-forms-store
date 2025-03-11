import {Field} from '../fields/Field';
import {ValidationResult} from '../validation/Validator';

export type DefaultFormState = Record<string, Field<any, Form<any>>>;

export class Form<State extends DefaultFormState = DefaultFormState> {
    fields: State;
    formErrors: string[] = [];
    errors: ValidationResult[] = [];
    submitting = false;
    readonly subscribers: Set<() => void> = new Set();

    constructor(fields: State) {
        this.fields = fields;
        this.registerFields(fields);
    }

    /**
     * Registers fields and sets their form reference.
     * @param {State} fields - The fields to register.
     */
    registerFields = (fields: State) => {
        this.fields = fields;
        Object.values(this.fields).forEach((field: Field<any, Form<any>>) => {
            field.form = this;
        });
    };

    /**
     * Triggers all subscriber callbacks.
     */
    triggerSubscribers = () => {
        this.subscribers.forEach(callback => callback());
    };

    /**
     * Checks if any field in the form is dirty.
     * @returns {boolean} True if any field is dirty, false otherwise.
     */
    isDirty = (): boolean => {
        return !Object.values(this.fields).every(
            (field: Field<any, Form<any>>) => !field.dirty
        );
    };

    /**
     * Saves the current state of all fields.
     */
    saveState = () => {
        Object.values(this.fields).forEach((field: Field<any, Form<any>>) =>
            field.saveValue()
        );
    };

    /**
     * Subscribes a callback to be triggered on form updates.
     * @param {() => void} callback - The callback to subscribe.
     * @returns {() => void} A function to unsubscribe the callback.
     */
    subscribe = (callback: () => void): (() => void) => {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    };

    /**
     * Validates all fields in the form.
     * @returns {Promise<boolean>} True if the form is valid, false otherwise.
     */
    formValid = async (): Promise<boolean> => {
        const errors: ValidationResult[] = [];
        let valid = true;
        const fs = Object.values(this.fields) as Field<any, Form<any>>[];
        for await (const field of fs) {
            const validationResult = await field.validate();

            errors.push(validationResult);

            if (!validationResult.success) {
                valid = false;
            }
        }

        this.errors = errors;
        return valid;
    };

    /**
     * Retrieves the current values of all fields in the form.
     * @returns {{[Key in keyof State]: State[Key]['value']}} An object containing the current values of all fields.
     */
    getData = (): {[Key in keyof State]: State[Key]['value']} => {
        const data = {} as {[Key in keyof State]: State[Key]['value']};
        for (const [key, value] of Object.entries(this.fields)) {
            const k = key as keyof State;
            const v: Field<any, Form<any>> = value;

            data[k] = v.getValue();
        }

        return data;
    };

    /**
     * Resets all fields in the form to their initial values.
     */
    reset = () => {
        Object.values(this.fields).forEach((field: Field<any, Form<any>>) =>
            field.reset()
        );
    };

    /**
     * Submits the form if it is valid.
     * @param {(data: {[Key in keyof State]: State[Key]['value']}) => Promise<void>} handleSubmit - The function to handle form submission.
     * @returns {Promise<void | false>} A promise that resolves when the form is submitted or false if the form is invalid.
     */
    submit = async (
        handleSubmit: (data: {
            [Key in keyof State]: State[Key]['value'];
        }) => Promise<void>
    ) => {
        this.submitting = true;
        this.triggerSubscribers();
        if (await this.formValid()) {
            this.saveState();
            await handleSubmit(this.getData());
            this.submitting = false;
            this.triggerSubscribers();
            return;
        }
        this.submitting = false;
        this.triggerSubscribers();
        return false;
    };

    /**
     * Raises errors for the form and its fields.
     * @param {{fieldErrors?: {[Key in keyof State]: string[]}; formErrors?: string[]}} param0 - An object containing field and form errors.
     */
    raiseErrors = ({
        fieldErrors,
        formErrors = [],
    }: {
        fieldErrors?: {[Key in keyof State]: string[]};
        formErrors?: string[];
    }) => {
        this.formErrors = formErrors;

        if (fieldErrors) {
            const raisedErrors: ValidationResult[] = [];
            for (const [key, value] of Object.entries(this.fields)) {
                const k = key as keyof State;
                const v: Field<any, Form<any>> = value;

                const errors = fieldErrors[k];
                /* istanbul ignore else */
                if (errors) {
                    raisedErrors.push(v.raiseErrors(fieldErrors[k]));
                }
            }
            this.errors = raisedErrors;
        }

        this.triggerSubscribers();
    };
}
