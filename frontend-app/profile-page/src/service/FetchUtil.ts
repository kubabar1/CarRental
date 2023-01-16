export interface ResponseData<T> {
    statusCode: number;
    responseBody?: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export async function fetchPost<T>(getPath: string, data?: any): Promise<T> {
    return fetch(getPath, {
        method: 'POST',
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
        if (res.status >= 200 && res.status < 300) {
            console.log('POST OK');
        } else {
            console.log('POST NOK');
        }
        return res.json();
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
        if (res.status >= 200 && res.status < 300) {
            console.log('GET OK');
            console.log(res.status);
            console.log(res);
        } else {
            console.log('GET NOK');
        }
        return res.json();
    });
}