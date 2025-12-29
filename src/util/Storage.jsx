// Stroage Comonent
export const setLocalStorage = (key, value) => {
    if (value && typeof value === 'string') {
        localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    try {
        return JSON.parse(data);
    } catch (e) {
        console.log(e);
        return data;
    }
};

export const clearLocalStorage = (key) => localStorage.removeItem(key);