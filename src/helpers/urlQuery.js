export const build = (url, params) => {
    let query = '';

    Object.keys(params).forEach((param) => {
        const value = params[param];
        let isArray = false;
        let isValid = false;

        if (Array.isArray(value)) {
            isArray = true;

            if (value && value.length) {
                isValid = true;
            }
        } else if (params[param]) {
            isValid = true;
        }

        if (isValid) {
            query += query.length === 0 ? '?' : '&';
            query += `${param}=${isArray ? value.join(',') : value}`;
        }
    });

    return `${url}${query}`;
};

function paramsToObject(entries) {
    const result = {};
    entries.forEach((value, key) => {
        result[key] = value;
    });
    return result;
}

export const toObject = (queryString) => {
    const params = new URLSearchParams(queryString);
    const paramsObject = paramsToObject(params);

    Object.keys(paramsObject).forEach((key) => {
        const currentValue = paramsObject[key];

        if (currentValue.includes(',')) {
            paramsObject[key] = currentValue.split(',');
        }
    });

    return paramsObject;
};
