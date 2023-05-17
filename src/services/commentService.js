import http from './httpService';

const apiEndpoint = process.env.REACT_APP_API_URL + "/posts";

export function addComment(postId, comment) {
    return http.post(apiEndpoint + '/' + postId + "/comments", {body: comment.body});
}

export function deleteComment(comment) {
    return http.delete(apiEndpoint + '/' + comment.postId + "/comments/" + comment._id);
}

