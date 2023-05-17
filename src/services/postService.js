import http from './httpService';


const apiEndpoint = process.env.REACT_APP_API_URL + "/posts";

export function getHomePosts() {
    return http.get(apiEndpoint + '/home');
}

export function getProfilePosts(userName) {
    return http.get(apiEndpoint + '/' + userName);
}

export function getPost(id) {
    return http.get(apiEndpoint + '/post/' + id);
}

export function savePost(post) {
    return http.post(apiEndpoint, {body: post.body});
}

export function editPost(post) {
    return http.put(apiEndpoint + '/' + post._id, {body: post.body});
}

export function deletePost(postId) {
    return http.delete(apiEndpoint + '/' + postId);
}