import {DateField} from './DateField';

describe('DateField', () => {
    it('should initialize with default values', () => {
        const field = new DateField({
            label: 'Test Date',
        });

        expect(field.label).toBe('Test Date');
        expect(field.value).toBeUndefined();
    });

    it('should set and get value correctly', () => {
        const field = new DateField({
            label: 'Test Date',
        });

        const date = new Date(2023, 0, 1);
        field.setValue(date);
        expect(field.value).toEqual(date);

        const newDate = new Date(2023, 11, 31);
        field.setValue(newDate);
        expect(field.value).toEqual(newDate);
    });

    it('should validate required field', async () => {
        const field = new DateField({
            label: 'Test Date',
            required: true,
        });

        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({msg: 'This field is required'});

        field.setValue(new Date(2023, 0, 1));
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate custom rule', async () => {
        const field = new DateField({
            label: 'Test Date',
            validation: [
                {
                    rule: value => value?.getFullYear() === 2023,
                    error: 'Only dates in 2023 are valid.',
                },
            ],
        });

        field.setValue(new Date(2022, 11, 31));
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: 'Only dates in 2023 are valid.',
        });

        field.setValue(new Date(2023, 0, 1));
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate min date', async () => {
        const minDate = new Date(2023, 0, 1);
        const field = new DateField({
            label: 'Test Date',
            min: minDate,
        });

        field.setValue(new Date(2022, 11, 31));
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: `Date must be on or after ${minDate.toLocaleDateString()}.`,
        });

        field.setValue(new Date(2023, 0, 1));
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate max date', async () => {
        const maxDate = new Date(2023, 11, 31);
        const field = new DateField({
            label: 'Test Date',
            max: maxDate,
        });

        field.setValue(new Date(2024, 0, 1));
        const result = await field.validate();
        expect(result.success).toBe(false);
        expect(result.errors).toContainEqual({
            msg: `Date must be on or before ${maxDate.toLocaleDateString()}.`,
        });

        field.setValue(new Date(2023, 11, 31));
        const resultAfterSetValue = await field.validate();
        expect(resultAfterSetValue.success).toBe(true);
        expect(resultAfterSetValue.errors).toBeUndefined();
    });

    it('should validate both min and max dates', async () => {
        const minDate = new Date(2023, 0, 1);
        const maxDate = new Date(2023, 11, 31);
        const field = new DateField({
            label: 'Test Date',
            min: minDate,
            max: maxDate,
        });

        field.setValue(new Date(2022, 11, 31));
        const resultMin = await field.validate();
        expect(resultMin.success).toBe(false);
        expect(resultMin.errors).toContainEqual({
            msg: `Date must be on or after ${minDate.toLocaleDateString()}.`,
        });

        field.setValue(new Date(2024, 0, 1));
        const resultMax = await field.validate();
        expect(resultMax.success).toBe(false);
        expect(resultMax.errors).toContainEqual({
            msg: `Date must be on or before ${maxDate.toLocaleDateString()}.`,
        });

        field.setValue(new Date(2023, 6, 15));
        const resultValid = await field.validate();
        expect(resultValid.success).toBe(true);
        expect(resultValid.errors).toBeUndefined();
    });

    it('should handle dateTime option correctly', () => {
        const field = new DateField({
            label: 'Test DateTime',
            dateTime: true,
        });

        expect(field.dateTime).toBe(true);

        const dateTime = new Date(2023, 0, 1, 12, 30);
        field.setValue(dateTime);
        expect(field.value).toEqual(dateTime);

        const newDateTime = new Date(2023, 11, 31, 23, 59);
        field.setValue(newDateTime);
        expect(field.value).toEqual(newDateTime);
    });
});
