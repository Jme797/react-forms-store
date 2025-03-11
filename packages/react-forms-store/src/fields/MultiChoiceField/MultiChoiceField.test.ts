import {MultipleChoiceField} from './MultiChoiceField';

describe('MultipleChoiceField', () => {
    it('should initialize with default values', () => {
        const field = new MultipleChoiceField({
            label: 'Test Multiple Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
                {value: 'option3', label: 'Option 3'},
            ],
        });

        expect(field.label).toBe('Test Multiple Choice');
        expect(field.choices).toEqual([
            {value: 'option1', label: 'Option 1'},
            {value: 'option2', label: 'Option 2'},
            {value: 'option3', label: 'Option 3'},
        ]);
        expect(field.value).toEqual([]);
    });

    it('should set and get value correctly', () => {
        const field = new MultipleChoiceField({
            label: 'Test Multiple Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
                {value: 'option3', label: 'Option 3'},
            ],
        });

        field.setValue([{value: 'option1', label: 'Option 1'}]);
        expect(field.value).toEqual([{value: 'option1', label: 'Option 1'}]);

        field.setValue([
            {value: 'option1', label: 'Option 1'},
            {value: 'option2', label: 'Option 2'},
        ]);
        expect(field.value).toEqual([
            {value: 'option1', label: 'Option 1'},
            {value: 'option2', label: 'Option 2'},
        ]);
    });

    it('should validate required field', async () => {
        const field = new MultipleChoiceField({
            label: 'Test Multiple Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
                {value: 'option3', label: 'Option 3'},
            ],
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        field.setValue([{value: 'option1', label: 'Option 1'}]);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate custom rule', async () => {
        const field = new MultipleChoiceField({
            label: 'Test Multiple Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
                {value: 'option3', label: 'Option 3'},
            ],
            validation: [
                {
                    rule: value => value.length >= 2,
                    error: 'At least two options must be selected.',
                },
            ],
        });

        field.setValue([{value: 'option1', label: 'Option 1'}]);
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'At least two options must be selected.',
        });

        field.setValue([
            {value: 'option1', label: 'Option 1'},
            {value: 'option2', label: 'Option 2'},
        ]);
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should add value by value', () => {
        const field = new MultipleChoiceField({
            label: 'Test Multiple Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
                {value: 'option3', label: 'Option 3'},
            ],
        });

        field.addValueByValue('option1');
        expect(field.value).toEqual([{value: 'option1', label: 'Option 1'}]);

        field.addValueByValue('option2');
        expect(field.value).toEqual([
            {value: 'option1', label: 'Option 1'},
            {value: 'option2', label: 'Option 2'},
        ]);
    });

    it('should remove value by value', () => {
        const field = new MultipleChoiceField({
            label: 'Test Multiple Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
                {value: 'option3', label: 'Option 3'},
            ],
        });

        field.setValue([
            {value: 'option1', label: 'Option 1'},
            {value: 'option2', label: 'Option 2'},
        ]);

        field.removeValueByValue('option1');
        expect(field.value).toEqual([{value: 'option2', label: 'Option 2'}]);

        field.removeValueByValue('option2');
        expect(field.value).toEqual([]);
    });

    it('should check if the field has a value', () => {
        const field = new MultipleChoiceField({
            label: 'Test Multiple Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
                {value: 'option3', label: 'Option 3'},
            ],
        });

        expect(field.hasValue()).toBe(false);

        field.setValue([{value: 'option1', label: 'Option 1'}]);
        expect(field.hasValue()).toBe(true);
    });
});
