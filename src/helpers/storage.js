const createCookie = (key, value, exp) => {
    const date = new Date();

    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));

    const expires = '; expires=' + date.toGMTString();

    document.cookie = key + '=' + value + expires + '; path=/';
};

const readCookie = (key) => {
    const nameEQ = key + '=';
    const ca = document.cookie.split(';');

    for (let i = 0, max = ca.length; i < max; i += 1) {
        let c = ca[i];

        while (c.charAt(0) === ' ') c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
};

export const setItem = (key, value) => {
    const { localStorage } = window;
    let newValue = value;

    if (typeof newValue === 'object') {
        newValue = JSON.stringify(newValue);
    }

    if (localStorage) {
        localStorage.setItem(key, newValue);
    } else {
        createCookie(key, newValue, 30);
    }
};

export const removeItem = (key) => {
    const { localStorage } = window;

    if (localStorage) {
        localStorage.removeItem(key);
    } else {
        createCookie(key, '', -1);
    }
};

export const getItem = (key) => {
    const { localStorage } = window;
    let data;

    if (localStorage) {
        data = localStorage.getItem(key);
    } else {
        data = readCookie(key);
    }

    try {
        if (key !== 'token') {
            data = JSON.parse(data);
        }
    } catch (e) {
        console.error('Failed to parse JSON storage');
        removeItem(key);
    }

    return data;
};
