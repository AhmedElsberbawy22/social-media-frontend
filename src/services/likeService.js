import http from './httpService';

const apiEndpoint = process.env.REACT_APP_API_URL + "/like";

export function likesNum(postId) {
    return http.get(apiEndpoint + '/' + postId + '/likes');
}

export function likes(postId) {
    return http.get(apiEndpoint + '/' + postId);
}
