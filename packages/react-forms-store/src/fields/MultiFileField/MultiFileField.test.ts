import {MultipleFileField} from './MultiFileField';

describe('MultipleFileField', () => {
    it('should initialize with default values', () => {
        const field = new MultipleFileField({
            label: 'Test Multi File',
        });

        expect(field.label).toBe('Test Multi File');
        expect(field.value).toEqual([]);
        expect(field.required).toBe(false);
        expect(field.errors.success).toBeTruthy();
        expect(field.errors.errors).toBeUndefined();
    });

    it('should initialize with provided initial value', () => {
        const file1 = new File(['content1'], 'test1.txt', { type: 'text/plain' });
        const file2 = new File(['content2'], 'test2.txt', { type: 'text/plain' });

        const field = new MultipleFileField({
            label: 'Test Multi File',
            initValue: [file1, file2],
        });

        expect(field.label).toBe('Test Multi File');
        expect(field.value).toEqual([file1, file2]);
        expect(field.required).toBe(false);
        expect(field.errors.success).toBeTruthy();
        expect(field.errors.errors).toBeUndefined();
    });

    it('should set and get value correctly', () => {
        const field = new MultipleFileField({
            label: 'Test Multi File',
        });

        const file1 = new File(['content1'], 'test1.txt', {type: 'text/plain'});
        const file2 = new File(['content2'], 'test2.txt', {type: 'text/plain'});
        field.setValue([file1]);
        expect(field.value).toEqual([file1]);

        field.setValue([file1, file2]);
        expect(field.value).toEqual([file1, file2]);
    });

    it('should validate required field', async () => {
        const field = new MultipleFileField({
            label: 'Test Multi File',
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        const file = new File(['content'], 'test.txt', {type: 'text/plain'});
        field.setValue([file]);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate custom rule', async () => {
        const field = new MultipleFileField({
            label: 'Test Multi File',
            validation: [
                {
                    rule: value =>
                        value.every(file => file.type === 'text/plain'),
                    error: 'Only plain text files are valid.',
                },
            ],
        });

        const invalidFile = new File(['content'], 'test.pdf', {
            type: 'application/pdf',
        });
        field.setValue([invalidFile]);
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Only plain text files are valid.',
        });

        const validFile = new File(['content'], 'test.txt', {
            type: 'text/plain',
        });
        field.setValue([validFile]);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });
});
