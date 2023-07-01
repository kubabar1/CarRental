import { FieldValues } from 'react-hook-form';
import { FieldPath, UseFormSetValue } from 'react-hook-form/dist/types';
import { UseFormWatch } from 'react-hook-form/dist/types/form';

export interface ReactHookFormStorage<T> {
    clear: () => void;
    setValuesInForm: () => void;
    setValuesInStorage: () => void;
    getAllValues: () => T;
    replaceValueInStorage: (key: string, value: string | null) => void;
    removeValueFromStorage: (key: string) => void;
}

export const reactHookFormStorage = <T extends FieldValues>(
    storageName: string,
    setValue: UseFormSetValue<T>,
    watch: UseFormWatch<T>
): ReactHookFormStorage<T> => {
    const getStorage = () => window.sessionStorage;

    const clearStorage = () => getStorage().removeItem(storageName);

    const setValuesInForm = () => {
        const str = getStorage().getItem(storageName);
        if (str) {
            const values: T = JSON.parse(str);
            Object.keys(values).forEach((key: string) => {
                setValue(key as FieldPath<T>, values[key as FieldPath<T>]);
            });
        }
    };

    const getAllValues = (): T => {
        const storageItem = getStorage().getItem(storageName);
        if (storageItem === null) {
            return {} as T;
        } else {
            return JSON.parse(storageItem);
        }
    };

    const setValuesInStorage = () => {
        const watchedValues = watch();
        const values = Object.assign({}, watchedValues);
        if (Object.entries(values).length) {
            getStorage().setItem(storageName, JSON.stringify(values));
        }
    };

    const replaceValueInStorage = (key: string, value: string | null) => {
        getStorage().setItem(
            storageName,
            JSON.stringify(
                Object.assign({}, getAllValues(), {
                    [key]: value,
                })
            )
        );
    };

    const removeValueFromStorage = (key: string) => {
        const allValues: T = getAllValues();
        delete allValues[key];
        getStorage().setItem(storageName, JSON.stringify(allValues));
    };

    return {
        clear: clearStorage,
        setValuesInForm: setValuesInForm,
        setValuesInStorage: setValuesInStorage,
        getAllValues: getAllValues,
        replaceValueInStorage: replaceValueInStorage,
        removeValueFromStorage: removeValueFromStorage,
    };
};
