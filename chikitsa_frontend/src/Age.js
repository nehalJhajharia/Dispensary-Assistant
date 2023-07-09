const Age = (dob) => {
    console.log(dob);
    const today = new Date();
    const birth_date = new Date(dob);

    let age = today.getFullYear() - birth_date.getFullYear();
    const month_diff = today.getMonth() - birth_date.getMonth();

    if(month_diff < 0 || ( month_diff === 0 && today.getDate() < birth_date.getDate()) ){
        age--;
    }

    return age.toString();
}

export default Age;