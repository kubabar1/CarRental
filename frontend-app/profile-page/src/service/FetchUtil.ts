export async function fetchPost<T, K = undefined>(getPath: string, data?: K): Promise<T> {
    return fetch(getPath, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        ...(!!data && { body: JSON.stringify(data) }),
    }).then((res: Response) => {
        if (res.status == 200) {
            console.log('OK');
        } else {
            console.log('NOK');
        }
        return res.json();
    });
}

export async function fetchGet<T>(getPath: string): Promise<T> {
    return fetch(getPath, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }).then((res: Response) => {
        if (res.status == 200) {
            console.log('OK');
        } else {
            console.log('NOK');
        }
        return res.json();
    });
}
