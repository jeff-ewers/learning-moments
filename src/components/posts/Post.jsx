
import "./Post.css";

export const Posts = ({post, likes}) => {
    const postLikeCount = likes.length;
    return (
        <div className="post">
            <div className="post-info">
                <h2>Title: {post.title}</h2>
                <h2>Likes: {postLikeCount}</h2>
                <h2>{post.body}</h2>
                
            </div>
        </div>
    )
}