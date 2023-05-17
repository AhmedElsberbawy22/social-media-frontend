import http from './httpService';

const apiEndpoint = process.env.REACT_APP_API_URL + "/follow";

export function follow(user){
    return http.post(apiEndpoint, {
        userName: user.userName
    });
}

