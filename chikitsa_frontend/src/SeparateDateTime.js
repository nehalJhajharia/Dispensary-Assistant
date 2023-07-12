export const convertDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleString([], options);
};

export const separateDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);

  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const time = dateTime.toLocaleTimeString([], timeOptions).toUpperCase();

  const date = convertDate(dateTime.toISOString().split('T')[0]);

  return { date, time };
};
  