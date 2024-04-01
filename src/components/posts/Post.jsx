import { Link } from "react-router-dom"
import "./Post.css";

export const Posts = ({post, likes}) => {
    const postLikeCount = likes.length;
    return (
        <div className="post">
            <div className="post-info">
                {/* Add link to title */}
                <Link key={post.id} to={`/posts/${post.id}`}>
                <h2>Title: {post.title}</h2>
                </Link>
                <h2>Likes: {postLikeCount}</h2>
                <h2>{post.body}</h2>
                
            </div>
        </div>
    )
}