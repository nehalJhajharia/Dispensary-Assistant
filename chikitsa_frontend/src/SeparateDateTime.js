const separateDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const time =  dateTime.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
    // const date  = dateTime.toLocaleDateString();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const date = dateTime.toLocaleString([], options);

    return {date, time};
}

export default separateDateTime;