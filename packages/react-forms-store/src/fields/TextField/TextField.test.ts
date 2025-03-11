import {TextField} from './TextField';

describe('TextField', () => {
    it('should initialize with default values', () => {
        const field = new TextField({
            label: 'Test Text',
            initValue: '',
        });

        expect(field.label).toBe('Test Text');
        expect(field.value).toBe('');
        expect(field.required).toBe(false);
        expect(field.errors).toHaveLength(0);
    });

    it('should set and get value correctly', () => {
        const field = new TextField({
            label: 'Test Text',
            initValue: '',
        });

        field.setValue('test value');
        expect(field.value).toBe('test value');

        field.setValue('new value');
        expect(field.value).toBe('new value');
    });

    it('should validate required field', async () => {
        const field = new TextField({
            label: 'Test Text',
            initValue: '',
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        field.setValue('test value');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });

    it('should validate custom rule', async () => {
        const field = new TextField({
            label: 'Test Text',
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
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });

    it('should check if the field has a value', () => {
        const field = new TextField({
            label: 'Test Text',
            initValue: '',
        });

        expect(field.hasValue()).toBe(false);

        field.setValue('test value');
        expect(field.hasValue()).toBe(true);
    });
});
