import {NumberField, TextField} from '../../fields';

import {MultiPartForm} from './MultiPartForm';

const createMultiPartForm = () => {
    return new MultiPartForm({
        personalInfo: {
            firstName: new TextField({label: 'First Name', required: true}),
            lastName: new TextField({label: 'Last Name', required: true}),
        },
        contactInfo: {
            email: new TextField({label: 'Email', required: true}),
            phone: new NumberField({label: 'Phone', required: true}),
        },
    });
};

describe('MultiPartForm', () => {
    it('should initialize with default values', () => {
        const form = createMultiPartForm();
        expect(form.getData()).toEqual({
            personalInfo: {
                firstName: '',
                lastName: '',
            },
            contactInfo: {
                email: '',
                phone: undefined,
            },
        });
    });

    it('should set and get field values', () => {
        const form = createMultiPartForm();
        form.forms.personalInfo.fields.firstName.setValue('John');
        form.forms.personalInfo.fields.lastName.setValue('Doe');
        form.forms.contactInfo.fields.email.setValue('john.doe@example.com');
        form.forms.contactInfo.fields.phone.setValue(1234567890);

        expect(form.getData()).toEqual({
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
            },
            contactInfo: {
                email: 'john.doe@example.com',
                phone: 1234567890,
            },
        });
    });

    it('should validate required fields', async () => {
        const form = createMultiPartForm();
        const isValid = await form.getCurrentForm().formValid();
        expect(isValid).toBe(false);

        form.forms.personalInfo.fields.firstName.setValue('John');
        form.forms.personalInfo.fields.lastName.setValue('Doe');

        const isValidAfterSettingValues = await form
            .getCurrentForm()
            .formValid();
        expect(isValidAfterSettingValues).toBe(true);
    });

    it('should trigger subscribers on form submitting state change', () => {
        const form = createMultiPartForm();
        const subscriber = jest.fn();
        form.subscribe(subscriber);

        form.forms.personalInfo.submitting = true;
        form.triggerSubscribers();
        expect(subscriber).toHaveBeenCalled();
    });

    it('should trigger subscribers on form error state change', () => {
        const form = createMultiPartForm();
        const subscriber = jest.fn();
        form.subscribe(subscriber);

        form.forms.personalInfo.raiseErrors({
            fieldErrors: {
                firstName: ['First Name is required'],
            },
        });
        form.triggerSubscribers();
        expect(subscriber).toHaveBeenCalled();
    });

    it('should handle form submission', async () => {
        const form = createMultiPartForm();
        form.forms.personalInfo.fields.firstName.setValue('John');
        form.forms.personalInfo.fields.lastName.setValue('Doe');
        form.forms.contactInfo.fields.email.setValue('john.doe@example.com');
        form.forms.contactInfo.fields.phone.setValue(1234567890);

        const handleSubmit = jest.fn();
        await form.submitStep(handleSubmit);

        expect(handleSubmit).toHaveBeenCalledWith({
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
            },
            contactInfo: {
                email: 'john.doe@example.com',
                phone: 1234567890,
            },
        });
    });

    it('should not submit if form is invalid', async () => {
        const form = createMultiPartForm();
        const handleSubmit = jest.fn();
        const result = await form.submitStep(handleSubmit);

        expect(result).toBe(false);
        expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should mark the form as dirty if a field value changes', () => {
        const form = createMultiPartForm();
        expect(form.forms.personalInfo.isDirty()).toBe(false);

        form.forms.personalInfo.fields.firstName.setValue('John');
        expect(form.forms.personalInfo.isDirty()).toBe(true);
    });

    it('should reset all fields to their initial values', () => {
        const form = createMultiPartForm();

        expect(form.getData()).toEqual({
            personalInfo: {
                firstName: '',
                lastName: '',
            },
            contactInfo: {
                email: '',
                phone: undefined,
            },
        });

        form.forms.personalInfo.fields.firstName.setValue('John');
        form.forms.personalInfo.fields.lastName.setValue('Doe');
        form.forms.contactInfo.fields.email.setValue('john.doe@example.com');
        form.forms.contactInfo.fields.phone.setValue(1234567890);

        expect(form.getData()).toEqual({
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
            },
            contactInfo: {
                email: 'john.doe@example.com',
                phone: 1234567890,
            },
        });

        form.forms.personalInfo.reset();
        form.forms.contactInfo.reset();

        expect(form.getData()).toEqual({
            personalInfo: {
                firstName: '',
                lastName: '',
            },
            contactInfo: {
                email: '',
                phone: undefined,
            },
        });
        expect(form.forms.personalInfo.isDirty()).toBe(false);
        expect(form.forms.contactInfo.isDirty()).toBe(false);
    });

    it('should return false when nextStep is called on the last step', () => {
        const form = createMultiPartForm();
        form.nextStep(); // Move to contactInfo step
        const result = form.nextStep(); // Attempt to move past the last step
        expect(result).toBe(false);
    });

    it('should return false when previousStep is called on the first step', () => {
        const form = createMultiPartForm();
        const result = form.previousStep(); // Attempt to move before the first step
        expect(result).toBe(false);
    });

    it('should allow moving backwards through the steps', () => {
        const form = createMultiPartForm();
        form.nextStep(); // Move to contactInfo step
        expect(form.currentStep).toBe('contactInfo');

        form.previousStep(); // Move back to personalInfo step
        expect(form.currentStep).toBe('personalInfo');
    });

    it('should trigger subscribers when changing steps', () => {
        const form = createMultiPartForm();
        const subscriber = jest.fn();
        form.subscribe(subscriber);

        form.nextStep(); // Move to contactInfo step
        expect(subscriber).toHaveBeenCalled();

        form.previousStep(); // Move back to personalInfo step
        expect(subscriber).toHaveBeenCalled();
    });

    it('should allow unsubscribing from the form', () => {
        const form = createMultiPartForm();
        const subscriber = jest.fn();
        const unsubscribe = form.subscribe(subscriber);

        unsubscribe();
        form.nextStep(); // Move to contactInfo step
        expect(subscriber).not.toHaveBeenCalled();
    });
});
