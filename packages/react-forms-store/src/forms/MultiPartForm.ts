import {DefaultFormState, Form} from './Form';

export type MultiPartFormState = Record<string, DefaultFormState>;

export class MultiPartForm<
    State extends MultiPartFormState = MultiPartFormState,
> {
    currentStep: keyof State;
    steps: (keyof State)[];
    forms: {[K in keyof State]: Form<State[K]>};
    private formElement: HTMLFormElement | null = null;
    private readonly subscribers: Set<() => void> = new Set();

    constructor(fields: State) {
        this.steps = Object.keys(fields) as (keyof State)[];
        this.currentStep = this.steps[0];
        this.forms = this.steps.reduce(
            (acc, step) => {
                acc[step] = new Form(fields[step]);
                return acc;
            },
            {} as {[K in keyof State]: Form<State[K]>}
        );
    }

    /**
     * Sets the form element reference.
     * @param {HTMLFormElement | null} element - The form element.
     */
    setFormElement = (element: HTMLFormElement | null) => {
        this.formElement = element;
    };

    /**
     * Moves to the next step in the form.
     * @returns {boolean} True if the step was changed, false otherwise.
     */
    nextStep = (): boolean => {
        const currentIndex = this.steps.indexOf(this.currentStep);
        if (currentIndex < this.steps.length - 1) {
            this.currentStep = this.steps[currentIndex + 1];
            this.triggerSubscribers();
            this.resetFocus();
            return true;
        }
        return false;
    };

    /**
     * Moves to the previous step in the form.
     * @returns {boolean} True if the step was changed, false otherwise.
     */
    previousStep = (): boolean => {
        const currentIndex = this.steps.indexOf(this.currentStep);
        if (currentIndex > 0) {
            this.currentStep = this.steps[currentIndex - 1];
            this.triggerSubscribers();
            this.resetFocus();
            return true;
        }
        return false;
    };

    /**
     * Retrieves the current form for the current step.
     * @returns {Form} The form for the current step.
     */
    getCurrentForm = (): Form<State[keyof State]> => {
        return this.forms[this.currentStep];
    };

    /**
     * Validates all fields in the current step.
     * @returns {Promise<boolean>} True if the current step is valid, false otherwise.
     */
    stepValid = async (): Promise<boolean> => {
        return this.getCurrentForm().formValid();
    };

    /**
     * Submits the form if the current step is valid.
     * @param {(data: State) => Promise<void>} handleSubmit - The function to handle form submission.
     * @returns {Promise<void | false>} A promise that resolves when the form is submitted or false if the current step is invalid.
     */
    submitStep = async (handleSubmit: (data: State) => Promise<void>) => {
        const currentForm = this.getCurrentForm();
        currentForm.submitting = true;
        currentForm.triggerSubscribers();
        if (await this.stepValid()) {
            currentForm.saveState();
            await handleSubmit(this.getData());
            currentForm.submitting = false;
            currentForm.triggerSubscribers();
            return;
        }
        currentForm.submitting = false;
        currentForm.triggerSubscribers();
        return false;
    };

    /**
     * Retrieves the form data for all steps.
     * @returns {State} The form data for all steps.
     */
    getData = (): State => {
        const data: Partial<State> = {};
        for (const step of this.steps) {
            data[step] = this.forms[step].getData() as State[keyof State];
        }
        return data as State;
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
     * Triggers all subscriber callbacks.
     */
    triggerSubscribers = () => {
        this.subscribers.forEach(callback => callback());
    };

    /**
     * Resets focus to the form element.
     */
    private resetFocus = () => {
        if (this.formElement) {
            this.formElement.focus();
        }
    };
}
