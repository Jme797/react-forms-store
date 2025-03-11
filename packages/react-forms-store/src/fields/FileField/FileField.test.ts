import {FileField} from './FileField';

describe('FileField', () => {
    it('should initialize with default values', () => {
        const field = new FileField({
            label: 'Test File',
        });

        expect(field.label).toBe('Test File');
        expect(field.value).toBeUndefined();
        expect(field.required).toBe(false);
        expect(field.errors.success).toBe(true);
        expect(field.errors.errors).toBeUndefined();
    });

    it('should set and get value correctly', () => {
        const field = new FileField({
            label: 'Test File',
        });

        const file = new File(['content'], 'test.txt', {type: 'text/plain'});
        field.setValue(file);
        expect(field.value).toEqual(file);

        const newFile = new File(['new content'], 'new_test.txt', {
            type: 'text/plain',
        });
        field.setValue(newFile);
        expect(field.value).toEqual(newFile);
    });

    it('should validate required field', async () => {
        const field = new FileField({
            label: 'Test File',
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        const file = new File(['content'], 'test.txt', {type: 'text/plain'});
        field.setValue(file);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate custom rule', async () => {
        const field = new FileField({
            label: 'Test File',
            validation: [
                {
                    rule: value => value?.type === 'text/plain',
                    error: 'Only plain text files are valid.',
                },
            ],
        });

        const invalidFile = new File(['content'], 'test.pdf', {
            type: 'application/pdf',
        });
        field.setValue(invalidFile);
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Only plain text files are valid.',
        });

        const validFile = new File(['content'], 'test.txt', {
            type: 'text/plain',
        });
        field.setValue(validFile);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });
});
