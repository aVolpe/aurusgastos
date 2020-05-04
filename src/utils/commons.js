// return the user data from the session storage
/*
CodModulo
CodAbogado
RazonSocial
Telefono
Email
Direccion
Matricula
NroGrilla

*/
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }

  export const getUserName = () => {
    const userNameStr = sessionStorage.getItem('userName');
    if (userNameStr) return JSON.parse(userNameStr);
    else return null;
  }   

  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (user, userName) => {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('user', JSON.stringify(user));
  }