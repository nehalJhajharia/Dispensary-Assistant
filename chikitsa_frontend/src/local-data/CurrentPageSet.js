import saveDataToLocalStorage from "./Save";

const setPage = (page) => {
    saveDataToLocalStorage('page', page);
};

export default setPage;