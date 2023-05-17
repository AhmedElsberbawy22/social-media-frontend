import http from './httpService';
import jwtDecode from 'jwt-decode';


const apiEndpoint = process.env.REACT_APP_API_URL + "/auth";

export function login(userName, password){
    return http.post(apiEndpoint, {userName, password});
};

export function getCurrentUser() {
    try{
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
    }catch(ex){
        return null;
    }
}
export default {
    getCurrentUser
}