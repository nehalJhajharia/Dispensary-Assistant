import saveDataToLocalStorage from "./Save";

const saveCurrentAppointment = (appointment) => {
    saveDataToLocalStorage('appointment', appointment);
};

export default saveCurrentAppointment;