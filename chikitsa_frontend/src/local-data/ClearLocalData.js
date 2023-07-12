const deleteLocalData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('page');
  };
  
export default deleteLocalData;