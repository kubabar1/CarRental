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
    }).then((res: Response) => {
        if (!!successNotification && res.status >= 200 && res.status < 300) {
            console.log('###################################123');
            console.log('###################################123');
            console.log(res);
            console.log(successNotification);
            toast.success(successNotification);
        }
        if (!!errorNotification && (res.status < 200 || res.status > 300)) {
            toast.error(successNotification);
        }
        return res.json().then((data) => {
            return { statusCode: res.status, responseBody: data };
        });
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export async function fetchPut<T>(getPath: string, data?: any): Promise<ResponseData<T>> {
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
    }).then((res: Response) => {
        // if (res.status >= 200 && res.status < 300 && !!notification) {
        //     toast.success(notification);
        // }
        if (res.status >= 200 && res.status < 300) {
            console.log('PUT OK');
        } else {
            console.log('PUT NOK');
        }
        return res.json().then((data) => {
            return { statusCode: res.status, responseBody: data };
        });
    });
}

export async function fetchGet<T>(getPath: string): Promise<T> {
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
    }).then((res: Response) => {
        // if (res.status >= 200 && res.status < 300 && !!notification) {
        //     toast.success(notification);
        // }
        if (res.status >= 200 && res.status < 300) {
            console.log('GET OK');
        } else {
            console.log('GET NOK');
        }
        return res.json();
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export async function fetchDelete<T>(getPath: string, data?: any, notification?: string): Promise<ResponseData<T>> {
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
    }).then((res: Response) => {
        if (res.status >= 200 && res.status < 300 && !!notification) {
            toast.success(notification);
        }
        return res.json().then((data) => {
            return { statusCode: res.status, responseBody: data };
        });
    });
}

export async function fetchWithFile<T>(
    method: string,
    getPath: string,
    data: FormData,
    notification?: string
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
    }).then((res: Response) => {
        if (res.status >= 200 && res.status < 300 && !!notification) {
            toast.success(notification);
        }
        return res.json().then((data) => {
            return { statusCode: res.status, responseBody: data };
        });
    });
}
