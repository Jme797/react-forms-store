import {useSyncExternalStore} from 'use-sync-external-store/shim';

import {Field} from 'react-forms-store';

type UseFieldResult<T extends Field> = {
    value: T['value'];
    errors: string[];
    hasErrors: boolean;
};

const useField = <T extends Field>(field: T): UseFieldResult<T> => {
    const value = useSyncExternalStore(field.subscribe, () => field.value as T);
    const errors = useSyncExternalStore(field.subscribe, () => field.errors);

    const errorMessages = errors.errors?.map(error => error.msg) || [];

    return {
        value,
        errors: errorMessages,
        hasErrors: errorMessages.length > 0,
    };
};

export default useField;
