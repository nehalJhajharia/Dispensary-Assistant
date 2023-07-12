import getDataFromLocalStorage from "./Get";

const getCurrentAppoinment = () => {
    const appointment = getDataFromLocalStorage('appointment');
    return appointment;
};

export default getCurrentAppoinment;