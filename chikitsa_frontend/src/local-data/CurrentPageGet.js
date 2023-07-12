import getDataFromLocalStorage from "./Get";

const getPage = () => {
    const page = getDataFromLocalStorage('page');
    return page;
};

export default getPage;