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
        expect(field.errors).toHaveLength(0);
    });

    it('should set and get value correctly', () => {
        const field = new Field<string>({
            label: 'Test Field',
            initValue: '',
        });

        field.setValue('test value');
        expect(field.value).toBe('test value');

        field.setValue('new value');
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
        expect(resultAfterSetValue.errors).toHaveLength(0);
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
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });
});
