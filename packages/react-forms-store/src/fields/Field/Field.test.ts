import {Field} from './Field';

describe('Field', () => {
    it('should initialize with default values', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
        });

        expect(field.label).toBe('Test Field');
        expect(field.value).toBe('');
        expect(field.required).toBe(false);
        expect(field.errors.success).toBe(true);
        expect(field.errors.errors).toBeUndefined();
    });

    it('should set and get value correctly', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
        });

        field.setValue('test value');
        expect(field.value).toBe('test value');

        field.setValue(curr => curr.replace('test', 'new'));
        expect(field.value).toBe('new value');
    });

    it('should validate required field', async () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        field.setValue('test value');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate custom rule', async () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
            validation: [
                {
                    rule: value => value === 'valid value',
                    error: 'Only "valid value" is valid.',
                },
            ],
        });

        field.setValue('invalid value');
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Only "valid value" is valid.',
        });

        field.setValue('valid value');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate min length rule', async () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
            validation: [
                {
                    rule: value => value.length >= 5,
                    error: 'Value must be at least 5 characters long.',
                },
            ],
        });

        field.setValue('1234');
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Value must be at least 5 characters long.',
        });

        field.setValue('12345');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate max length rule', async () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
            validation: [
                {
                    rule: value => value.length <= 5,
                    error: 'Value must be at most 5 characters long.',
                },
            ],
        });

        field.setValue('123456');
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Value must be at most 5 characters long.',
        });

        field.setValue('12345');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate pattern rule', async () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
            validation: [
                {
                    rule: value => /^[a-z]+$/.test(value),
                    error: 'Value does not match the required pattern.',
                },
            ],
        });

        field.setValue('12345');
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Value does not match the required pattern.',
        });

        field.setValue('abcde');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate custom async rule', async () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
            validation: [
                {
                    rule: async value => value === 'valid value',
                    error: 'Only "valid value" is valid.',
                },
            ],
        });

        field.setValue('invalid value');
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Only "valid value" is valid.',
        });

        field.setValue('valid value');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should save value', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
        });

        field.setValue('new value');
        field.saveValue();
        expect(field.savedValue).toBe('new value');
        expect(field.dirty).toBe(false);
    });

    it('should set disabled state', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
        });

        field.setDisabled(true);
        expect(field.disabled).toBe(true);

        field.setDisabled(false);
        expect(field.disabled).toBe(false);
    });

    it('should dismiss errors', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
        });

        field.raiseErrors(['Error 1']);
        expect(field.errors.success).toBe(false);

        field.dismissErrors();
        expect(field.errors.success).toBe(true);
        expect(field.errors.errors).toBeUndefined();
    });

    it('should raise errors', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
        });

        const result = field.raiseErrors(['Error 1', 'Error 2']);
        expect(result.success).toBe(false);
        expect(result.errors).toHaveLength(2);
        expect(result.errors![0].msg).toBe('Error 1');
        expect(result.errors![1].msg).toBe('Error 2');
    });

    it('should reset to saved value', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
        });

        field.setValue('new value');
        field.reset();
        expect(field.value).toBe('initial value');
    });

    it('should reset to default value', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
            defaultValue: 'default value',
        });

        field.setValue('new value');
        field.resetToDefaultValue();
        expect(field.value).toBe('default value');
    });

    it('should trigger subscribers', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
        });

        const subscriber = jest.fn();
        field.subscribe(subscriber);

        field.setValue('new value');
        expect(subscriber).toHaveBeenCalled();
    });

    it('should subscribe and unsubscribe', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: 'initial value',
        });

        const subscriber = jest.fn();
        const unsubscribe = field.subscribe(subscriber);

        field.setValue('new value');
        expect(subscriber).toHaveBeenCalledTimes(2);

        unsubscribe();
        field.setValue('another value');
        expect(subscriber).toHaveBeenCalledTimes(2);
    });
});
