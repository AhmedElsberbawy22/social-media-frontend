import http from './httpService';



const apiEndpoint = process.env.REACT_APP_API_URL + "/users";

export function signUp(user){
    return http.post(apiEndpoint, {
        userName: user.userName,
        password: user.password
    });
}
