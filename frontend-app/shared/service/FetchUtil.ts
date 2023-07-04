import { toast } from 'react-toastify';
import { ResponseData } from '../model';

export async function fetchPost<T>(
    getPath: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    data?: any,
    successNotification?: string,
    errorNotification?: string
): Promise<ResponseData<T>> {
    return fetch(getPath, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        // credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        ...(!!data && { body: JSON.stringify(data) }),
    })
        .then((res: Response) => handleFetchResult<T>(res, successNotification))
        .catch(() => handleCatch<T>(errorNotification));
}

export async function fetchPut<T>(
    getPath: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    data?: any,
    successNotification?: string,
    errorNotification?: string
): Promise<ResponseData<T>> {
    return fetch(getPath, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        ...(!!data && { body: JSON.stringify(data) }),
    })
        .then((res: Response) => handleFetchResult<T>(res, successNotification))
        .catch(() => handleCatch<T>(errorNotification));
}

export async function fetchGet<T>(
    getPath: string,
    successNotification?: string,
    errorNotification?: string
): Promise<T> {
    return fetch(getPath, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
        .then((res: Response) => {
            if (!!successNotification && res.status >= 200 && res.status < 300) {
                toast.success(successNotification);
            }
            if (!!errorNotification && (res.status < 200 || res.status > 300)) {
                toast.error(successNotification);
            }
            return res.json();
        })
        .catch(() => {
            if (errorNotification) {
                toast.error(errorNotification);
            }
            return Promise.reject();
        });
}

export async function fetchDelete<T>(
    getPath: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    data?: any,
    successNotification?: string,
    errorNotification?: string
): Promise<ResponseData<T>> {
    return fetch(getPath, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        ...(!!data && { body: JSON.stringify(data) }),
    })
        .then((res: Response) => handleFetchResult<T>(res, successNotification))
        .catch(() => handleCatch<T>(errorNotification));
}

export async function fetchWithFile<T>(
    method: string,
    getPath: string,
    data: FormData,
    successNotification?: string,
    errorNotification?: string
): Promise<ResponseData<T>> {
    return fetch(getPath, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: data,
    })
        .then((res: Response) => handleFetchResult<T>(res, successNotification))
        .catch(() => handleCatch<T>(errorNotification));
}

function handleFetchResult<T>(res: Response, successNotification?: string): Promise<ResponseData<T>> {
    if (!!successNotification && res.status >= 200 && res.status < 300) {
        toast.success(successNotification);
    }
    return res.json().then((data) => {
        return { statusCode: res.status, responseBody: data };
    });
}

function handleCatch<T>(errorNotification?: string): Promise<ResponseData<T>> {
    if (errorNotification) {
        toast.error(errorNotification);
    }
    return Promise.reject();
}
