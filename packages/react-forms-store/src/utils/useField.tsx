import {Field} from '../fields/Field';
import {useSyncExternalStore} from 'use-sync-external-store/shim';

type UseFieldResult<T extends Field> = {
    value: T['value'];
    errors: string[];
    hasErrors: boolean;
};

const useField = <T extends Field>(field: T): UseFieldResult<T> => {
    const value = useSyncExternalStore(field.subscribe, () => field.value);
    const errors = useSyncExternalStore(field.subscribe, () => field.errors);

    const errorMessages = errors.errors?.map(error => error.msg) || [];

    return {
        value,
        errors: errorMessages,
        hasErrors: errorMessages.length > 0,
    };
};

export default useField;
