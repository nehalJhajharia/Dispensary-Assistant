import getDataFromLocalStorage from "./Get";

const loadUserData = () => {
    const user = getDataFromLocalStorage('user');
    return user;
};

export default loadUserData;