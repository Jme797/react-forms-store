import {NumberField, TextField} from '../../fields';

import {Form} from './Form';

const createForm = () => {
    return new Form({
        name: new TextField({label: 'Name', required: true}),
        age: new NumberField({label: 'Age', required: true, min: 0}),
    });
};

describe('Form', () => {
    it('should initialize with default values', () => {
        const form = createForm();
        expect(form.getData()).toEqual({
            name: '',
            age: undefined,
        });
    });

    it('should set and get field values', () => {
        const form = createForm();
        form.fields.name.setValue('John Doe');
        form.fields.age.setValue(30);

        expect(form.getData()).toEqual({
            name: 'John Doe',
            age: 30,
        });
    });

    it('should validate required fields', async () => {
        const form = createForm();
        const isValid = await form.formValid();
        expect(isValid).toBe(false);

        form.fields.name.setValue('John Doe');
        form.fields.age.setValue(30);

        const isValidAfterSettingValues = await form.formValid();
        expect(isValidAfterSettingValues).toBe(true);
    });

    it('should trigger subscribers on form submitting state change', () => {
        const form = createForm();
        const subscriber = jest.fn();
        form.subscribe(subscriber);

        form.submitting = true;
        form.triggerSubscribers();
        expect(subscriber).toHaveBeenCalled();
    });

    it('should trigger subscribers on form error state change', () => {
        const form = createForm();
        const subscriber = jest.fn();
        form.subscribe(subscriber);

        form.raiseErrors({
            fieldErrors: {
                name: ['Name is required'],
            },
        });
        form.triggerSubscribers();
        expect(subscriber).toHaveBeenCalled();
    });

    it('should handle form submission', async () => {
        const form = createForm();
        form.fields.name.setValue('John Doe');
        form.fields.age.setValue(30);

        const handleSubmit = jest.fn();
        await form.submit(handleSubmit);

        expect(handleSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
            age: 30,
        });
    });

    it('should not submit if form is invalid', async () => {
        const form = createForm();
        const handleSubmit = jest.fn();
        const result = await form.submit(handleSubmit);

        expect(result).toBe(false);
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should mark the form as dirty if a field value changes', () => {
        const form = createForm();
        expect(form.isDirty()).toBe(false);

        form.fields.name.setValue('John Doe');
        expect(form.isDirty()).toBe(true);
    });

    it('should reset all fields to their initial values', () => {
        const form = createForm();

        expect(form.getData()).toEqual({
            name: '',
            age: undefined,
        });

        form.fields.name.setValue('John Doe');
        form.fields.age.setValue(30);

        expect(form.getData()).toEqual({
            name: 'John Doe',
            age: 30,
        });

        form.reset();

        expect(form.getData()).toEqual({
            name: '',
            age: undefined,
        });
        expect(form.isDirty()).toBe(false);
    });

    it('should allow unsubscribing from the form', () => {
        const form = createForm();
        const subscriber = jest.fn();
        const unsubscribe = form.subscribe(subscriber);

        unsubscribe();
        form.triggerSubscribers();
        expect(subscriber).not.toHaveBeenCalled();
    });
});
