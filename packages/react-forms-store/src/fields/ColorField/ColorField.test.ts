import {ColorField} from './ColorField';

describe('ColorField', () => {
    it('should initialize with default values', () => {
        const field = new ColorField({
            label: 'Test Color',
        });

        expect(field.label).toBe('Test Color');
        expect(field.value).toBeUndefined();
    });

    it('should set and get value correctly', () => {
        const field = new ColorField({
            label: 'Test Color',
        });

        field.setValue('#ff0000');
        expect(field.value).toBe('#ff0000');

        field.setValue('#00ff00');
        expect(field.value).toBe('#00ff00');
    });

    it('should validate required field', async () => {
        const field = new ColorField({
            label: 'Test Color',
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        field.setValue('#ff0000');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });

    it('should validate custom rule', async () => {
        const field = new ColorField({
            label: 'Test Color',
            validation: [
                {
                    rule: value => value === '#ff0000',
                    error: 'Only #ff0000 is valid.',
                },
            ],
        });

        field.setValue('#00ff00');
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'Only #ff0000 is valid.'});

        field.setValue('#ff0000');
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });
});
