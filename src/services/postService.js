export const getPosts = () => {
    return fetch("http://localhost:8088/posts").then(res => res.json());
}

export const getLikes = () => {
    const likes = fetch('http://localhost:8088/likes?_expand=user&_expand=post').then(res => res.json())
    //const postLikes = likes.filter((post) => post.postId === postId);
    return likes;
}

export const getTopics = () => {
    const topics = fetch('http://localhost:8088/topics').then(res => res.json())
    return topics;
}