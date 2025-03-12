import {Field} from '../fields/Field';
import {Rules} from './types';

export class ValidatorError {
    msg: string;
    // index?: number;

    constructor(msg: string/* , index?: number */) {
        this.msg = msg;
        // this.index = index;
    }
}

export class ValidationResult {
    errors?: Array<ValidatorError>;
    success: boolean;
    field?: Field;

    constructor({
        success,
        errors,
        field,
    }: {
        success: boolean;
        errors?: Array<ValidatorError>;
        field?: Field<unknown>;
    }) {
        this.success = success;
        this.errors = errors;
        this.field = field;
    }
}

export class Validator<F extends Field> {
    rules: Rules<F> = [];
    valid = false;

    async validate(field: F): Promise<ValidationResult> {
        this.valid = true;
        const value = field.value as F['value'];

        if (field.isRequired() || field.hasValue()) {
            const errors: Array<ValidatorError> = [];

            if (!field.hasValue()) {
                errors.push(new ValidatorError('This field is required'));
            }

            for (const rule of this.rules) {
                const result = await rule.rule(value);
                if (result === false) {
                    errors.push(new ValidatorError(rule.error));
                }
                // /* If array of indexes create an error for each indvidual index */
                // if (Array.isArray(result)) {
                //     result.forEach(index => {
                //         errors.push(new ValidatorError(rule.error, index));
                //     });
                // }
            }

            this.valid = errors.length === 0;
            if (!this.valid) {
                return new ValidationResult({success: false, errors, field});
            }
        }

        return new ValidationResult({success: true, field});
    }
}
