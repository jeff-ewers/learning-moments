import { useState, useEffect } from "react";
import { getLikes, getPosts } from "../../services/postService.js";
import { Posts } from "./Post.jsx";
import "./AllPosts.css"
import { TopicSelect } from "./TopicSelect.jsx";

export const AllPosts = () => {
    const [allPosts, setPosts] = useState([]);
    const [likes, setLikes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPosts, setFilteredPosts] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(0);

    useEffect(() => {
        getPosts().then((postsArray) => {setPosts(postsArray)});
        getLikes().then((likesArray) => {setLikes(likesArray)});
        // setFilteredPosts(allPosts);
    }, [])

    useEffect(() => {
        setFilteredPosts(allPosts);
    }, [allPosts])

    useEffect(() => {
        const topicPosts = allPosts.filter(post => (parseInt(post.topicId) === parseInt(selectedTopic)))
        setFilteredPosts(topicPosts)
    }, [selectedTopic])

    useEffect(() => {
        const filteredPosts = allPosts.filter(post => ((post.body.toLowerCase().includes(searchTerm.toLowerCase())) || (post.title.toLowerCase().includes(searchTerm.toLowerCase()))))
        setFilteredPosts(filteredPosts);
    }, [searchTerm])

    return (
        <>
        <input
        onChange={(event) => {setSearchTerm(event.target.value)}}
        type="text"
        placeholder="Search posts"
        className="post-search"
        />
         <div><TopicSelect selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/></div>
        <div className="posts">
            {filterPosts.map(postObj => {
                
                return  <Posts key={postObj.id} post={postObj} likes={likes.filter((post) => post.postId === postObj.id)} />
                    
            })}
        </div>
        </>
        )


}
