import {ChoiceField} from './ChoiceField';

describe('ChoiceField', () => {
    it('should initialize with default values', () => {
        const field = new ChoiceField({
            label: 'Test Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
            ],
        });

        expect(field.label).toBe('Test Choice');
        expect(field.choices).toEqual([
            {value: 'option1', label: 'Option 1'},
            {value: 'option2', label: 'Option 2'},
        ]);
        expect(field.value).toBeUndefined();
    });

    it('should set and get value correctly', () => {
        const field = new ChoiceField({
            label: 'Test Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
            ],
        });

        field.setValue({value: 'option1', label: 'Option 1'});
        expect(field.value).toEqual({value: 'option1', label: 'Option 1'});

        field.setValue({value: 'option2', label: 'Option 2'});
        expect(field.value).toEqual({value: 'option2', label: 'Option 2'});
    });

    it('should validate required field', async () => {
        const field = new ChoiceField({
            label: 'Test Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
            ],
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        field.setValue({value: 'option1', label: 'Option 1'});
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });

    it('should validate custom rule', async () => {
        const field = new ChoiceField({
            label: 'Test Choice',
            choices: [
                {value: 'option1', label: 'Option 1'},
                {value: 'option2', label: 'Option 2'},
            ],
            validation: [
                {
                    rule: value => value?.value === 'option1',
                    error: 'Only Option 1 is valid.',
                },
            ],
        });

        field.setValue({value: 'option2', label: 'Option 2'});
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'Only Option 1 is valid.'});

        field.setValue({value: 'option1', label: 'Option 1'});
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toHaveLength(0);
    });
});
