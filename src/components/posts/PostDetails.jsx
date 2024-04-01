import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getLikes, getPostById } from "../../services/postService.js";
import { getUserById } from "../../services/userService.js";

export const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [likes, setLikes] = useState();
    const [author, setAuthor] = useState("");
    const [postAuthorId, setPostAuthorId] = useState();

    useEffect(() => {
        const fetchPost = async () => {
            const postObj = await getPostById(postId);
            setPost(postObj);
            const postAuthorIdKey = postObj.userId;
            setPostAuthorId(postAuthorIdKey)
            console.log(postAuthorIdKey)
        };
        const fetchLikes = async () => {
            const likesArray = await getLikes();
            const postLikes = likesArray.filter((like) => like.postId === parseInt(postId))
            const likesForPost = postLikes.length;
            setLikes(likesForPost);
        }
        fetchPost()
        fetchLikes()
    }, [postId])

    useEffect(() => {
        if (postAuthorId !== undefined) {
            const fetchPostAuthor = async (userId) => {
                const userObj = await getUserById(userId);
                const authorName = userObj.name; 
                setAuthor(authorName);
            }
            fetchPostAuthor(postAuthorId);
        }
    }, [postAuthorId]);
    

    return <>
    <section className="post">
        <header className="post-header">{post?.title}</header>
        <div className="post-info">Author: {author}</div>
        <div className="post-info">Date: {post?.date}</div>
        <div className="post-info">Likes: {likes}</div>
        <div className="post-info">{post?.body}</div>


        {/* TODO: Add buttons depending on user */}

        
    </section>
    </>

}