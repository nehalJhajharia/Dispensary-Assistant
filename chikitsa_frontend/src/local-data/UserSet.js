import saveDataToLocalStorage from "./Save";

const saveUserData = (user) => {
    saveDataToLocalStorage('user', user);
};

export default saveUserData;