import {ColorField} from './ColorField';

describe('ColorField', () => {
    it('should initialize with default values', () => {
        const field = new ColorField({
            label: 'Test Color',
        });

        expect(field.label).toBe('Test Color');
        expect(field.value).toBe('');
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
        expect(resultAfterSetValue.errors).toBeFalsy();
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
        expect(resultAfterSetValue.errors).toBeFalsy();
    });

    it('should validate hex color format', async () => {
        const field = new ColorField({
            label: 'Test Color',
            format: 'hex',
        });

        field.setValue('#ff0000');
        const resultValid = await field.validate();
        expect(resultValid.success).toBe(true);
        expect(resultValid.errors).toBeFalsy();

        field.setValue('ff0000');
        const resultInvalid = await field.validate();
        expect(resultInvalid.success).toBe(false);
        expect(resultInvalid.errors).toContainEqual({
            msg: 'Invalid color format. Expected hex.',
        });

        field.setValue('#ff000');
        const resultInvalidShort = await field.validate();
        expect(resultInvalidShort.success).toBe(false);
        expect(resultInvalidShort.errors).toContainEqual({
            msg: 'Invalid color format. Expected hex.',
        });

        field.setValue('#ff00000');
        const resultInvalidLong = await field.validate();
        expect(resultInvalidLong.success).toBe(false);
        expect(resultInvalidLong.errors).toContainEqual({
            msg: 'Invalid color format. Expected hex.',
        });
    });

    it('should validate rgb color format', async () => {
        const field = new ColorField({
            label: 'Test Color',
            format: 'rgb',
        });

        field.setValue('rgb(255, 0, 0)');
        const resultValid = await field.validate();
        expect(resultValid.success).toBe(true);
        expect(resultValid.errors).toBeFalsy();

        field.setValue('rgba(255, 0, 0, 1)');
        const resultInvalid = await field.validate();
        expect(resultInvalid.success).toBe(false);
        expect(resultInvalid.errors).toContainEqual({
            msg: 'Invalid color format. Expected rgb.',
        });

        field.setValue('#ff0000');
        const resultInvalidHex = await field.validate();
        expect(resultInvalidHex.success).toBe(false);
        expect(resultInvalidHex.errors).toContainEqual({
            msg: 'Invalid color format. Expected rgb.',
        });
    });

    it('should validate rgba color format', async () => {
        const field = new ColorField({
            label: 'Test Color',
            format: 'rgba',
        });

        field.setValue('rgba(255, 0, 0, 1)');
        const resultValid = await field.validate();
        expect(resultValid.success).toBe(true);
        expect(resultValid.errors).toBeFalsy();

        field.setValue('rgb(255, 0, 0)');
        const resultInvalid = await field.validate();
        expect(resultInvalid.success).toBe(false);
        expect(resultInvalid.errors).toContainEqual({
            msg: 'Invalid color format. Expected rgba.',
        });

        field.setValue('#ff0000');
        const resultInvalidHex = await field.validate();
        expect(resultInvalidHex.success).toBe(false);
        expect(resultInvalidHex.errors).toContainEqual({
            msg: 'Invalid color format. Expected rgba.',
        });
    });

    it('should validate hsl color format', async () => {
        const field = new ColorField({
            label: 'Test Color',
            format: 'hsl',
        });

        field.setValue('hsl(0, 100%, 50%)');
        const resultValid = await field.validate();
        expect(resultValid.success).toBe(true);
        expect(resultValid.errors).toBeFalsy();

        field.setValue('hsla(0, 100%, 50%, 1)');
        const resultInvalid = await field.validate();
        expect(resultInvalid.success).toBe(false);
        expect(resultInvalid.errors).toContainEqual({
            msg: 'Invalid color format. Expected hsl.',
        });

        field.setValue('#ff0000');
        const resultInvalidHex = await field.validate();
        expect(resultInvalidHex.success).toBe(false);
        expect(resultInvalidHex.errors).toContainEqual({
            msg: 'Invalid color format. Expected hsl.',
        });
    });

    it('should validate hsla color format', async () => {
        const field = new ColorField({
            label: 'Test Color',
            format: 'hsla',
        });

        field.setValue('hsla(0, 100%, 50%, 1)');
        const resultValid = await field.validate();
        expect(resultValid.success).toBe(true);
        expect(resultValid.errors).toBeFalsy();

        field.setValue('hsl(0, 100%, 50%)');
        const resultInvalid = await field.validate();
        expect(resultInvalid.success).toBe(false);
        expect(resultInvalid.errors).toContainEqual({
            msg: 'Invalid color format. Expected hsla.',
        });

        field.setValue('#ff0000');
        const resultInvalidHex = await field.validate();
        expect(resultInvalidHex.success).toBe(false);
        expect(resultInvalidHex.errors).toContainEqual({
            msg: 'Invalid color format. Expected hsla.',
        });
    });
});
