import {Field} from '../fields/Field';

type Result = boolean | number[];

export type ValidationFunction<F extends Field = Field> = (
    input: F['value']
) => Promise<Result> | Result;

export type Rule<F extends Field = Field> = {
    rule: ValidationFunction<F>;
    error: string;
};

export type Rules<F extends Field = Field> = Array<Rule<F>>;
