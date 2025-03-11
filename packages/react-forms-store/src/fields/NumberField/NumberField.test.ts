import {NumberField} from './NumberField';

describe('NumberField', () => {
    it('should initialize with default values', () => {
        const field = new NumberField({
            label: 'Test Number',
        });

        expect(field.label).toBe('Test Number');
        expect(field.value).toBeUndefined();
        expect(field.required).toBe(false);
        expect(field.errors).toHaveLength(0);
    });

    it('should set and get value correctly', () => {
        const field = new NumberField({
            label: 'Test Number',
        });

        field.setValue(42);
        expect(field.value).toBe(42);

        field.setValue(100);
        expect(field.value).toBe(100);
    });

    it('should validate required field', async () => {
        const field = new NumberField({
            label: 'Test Number',
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        field.setValue(42);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });

    it('should validate custom rule', async () => {
        const field = new NumberField({
            label: 'Test Number',
            validation: [
                {
                    rule: value => typeof value === 'number' && value >= 0,
                    error: 'Value must be non-negative.',
                },
            ],
        });

        field.setValue(-1);
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Value must be non-negative.',
        });

        field.setValue(42);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });

    it('should validate min and max values', async () => {
        const field = new NumberField({
            label: 'Test Number',
            min: 10,
            max: 100,
        });

        field.setValue(5);
        const resultMin = await field.validate();
        expect(resultMin.success).toBe(false);
        expect(resultMin.errors).toContainEqual({
            msg: 'Value must be at least 10.',
        });

        field.setValue(105);
        const resultMax = await field.validate();
        expect(resultMax.success).toBe(false);
        expect(resultMax.errors).toContainEqual({
            msg: 'Value must be at most 100.',
        });

        field.setValue(50);
        const resultValid = await field.validate();
        expect(resultValid.success).toBe(true);
        expect(resultValid.errors).toHaveLength(0);
    });
});
