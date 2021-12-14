
export default class Session {
  static setToken(value) {
    sessionStorage.setItem('token', value);
  }

 static getToken(){
  return sessionStorage.getItem('token');
 }

 static clear(){
  sessionStorage.removeItem('token');
  localStorage.removeItem('user');
 }

 static setUserData(value) {
  localStorage.setItem('user', JSON.stringify(value));
}

static getUserData(){
  const dataString = localStorage.getItem('user');
  return JSON.parse(dataString);
}

}
