const getDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
};

export default getDataFromLocalStorage;