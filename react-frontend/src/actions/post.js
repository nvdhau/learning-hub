import { API_CREATE_POST, 
    API_GET_POSTS, 
    API_CREATE_VIDEOPOST,
    API_GET_USER
} from '../config/endpoints-conf';
import axios from 'axios';

// firebase sign up account
export const createPost = (getUserIdToken) => (json) =>  {

    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.post(API_CREATE_POST, json , {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}

export const getAllPosts = (getUserIdToken) => (queryString) => {
    const params = {
        is_blog: queryString.filter,
        tags: queryString.tag,
        search: queryString.search
    };
    
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_POSTS, {
                params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                }
            }).then(res => {
                console.log("data", res.data);
                return res.data
            }).catch(err => {
                console.log("ERR: " + err);
            })
        }).catch(err => {
            console.log(err);
        })
}

export const getUserUploadPosts = (getUserIdToken) => (queryString) => {
    
    const params = {
        is_blog: queryString.filter,
        uid: queryString.uid,
    };
    const API_GET_USER_UPLOADS = API_GET_POSTS + 'user/' + params.uid
    
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_USER_UPLOADS, {
                params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                }
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log("ERR: " + err);
            })
        }).catch(err => {
            console.log(err);
        })
}

export const createVideoPost = (getUserIdToken) => (json) =>  {
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.post(API_CREATE_VIDEOPOST, json , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}

export const deletePost = (getUserIdToken) => (id) =>  {
    const API_DELETE_POST = API_GET_POSTS + id;
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.delete(API_DELETE_POST, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}
export const getPostDetail = (getUserIdToken) => (id) =>  {
    
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_POSTS + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                }
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log("ERR: " + err);
            })
        })
}

export const createPostComment = (getUserIdToken) => (id, json) =>  {
    const API_CREATE_POSTCOMMENTS = API_GET_POSTS + id + '/comment';
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.post(API_CREATE_POSTCOMMENTS, json , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}

export const getPostComments = (getUserIdToken) => (id) =>  {
    const API_GET_POSTCOMMENTS = API_GET_POSTS + id + '/comments';
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_POSTCOMMENTS, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                }
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log("ERR: " + err);
            })
        })
}

export const createPostReplyComment = (getUserIdToken) => (comment_id, json) =>  {
    const API_CREATE_POSTREPLYCOMMENTS = API_GET_POSTS + "comment/" + comment_id + '/reply';
    console.log("api endpoint", API_CREATE_POSTREPLYCOMMENTS);
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.put(API_CREATE_POSTREPLYCOMMENTS, json , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}

export const followUser = (getUserIdToken) => (login_uid, uid) =>  {
    const API_FOLLOW_USER = API_GET_USER + login_uid + '/follow/' + uid;
    console.log("api endpoint", API_FOLLOW_USER);
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.put(API_FOLLOW_USER , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}

export const unfollowUser = (getUserIdToken) => (login_uid, uid) =>  {
    const API_UNFOLLOW_USER = API_GET_USER + login_uid + '/unfollow/' + uid;
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.put(API_UNFOLLOW_USER , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}

export const getFavorites = (getUserIdToken) => (uid) =>  {
    const API_GET_POSTFAVORITE = API_GET_POSTS + 'user/' + uid + '/favorites';
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_POSTFAVORITE, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                }
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log("ERR: " + err);
            })
        })
}


export const toggleFavorites = (getUserIdToken) => (uid, postId, action) =>  {
    let API_PUT_POSTFAVORITE;
    if (action === 'favorite') {
        API_PUT_POSTFAVORITE = API_GET_USER + uid + '/favorites/' + postId;
    } else {
        API_PUT_POSTFAVORITE = API_GET_USER + uid + '/unfavorites/' + postId;
    }
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.put(API_PUT_POSTFAVORITE, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                }
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log("ERR: " + err);
            })
        })
}
