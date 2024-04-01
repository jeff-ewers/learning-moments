import { useState, useEffect } from "react"
import { getPosts, getTopics } from "../../services/postService.js"
import { TopicSelect } from "./TopicSelect.jsx"
import { getUserById } from "../../services/userService.js"
import { submitNewPost } from "../../services/postService.js"
import { Navigate } from "react-router-dom"

export const EditPost = ({currentUser}) => {
const [newPost, setNewPost] = useState({})
const [allPosts, setPosts] = useState([])
const [selectedTopic, setSelectedTopic] = useState(0);
const [newPostId, setNewPostId] = useState(null)
const [currentUserObj, setCurrentUserObj] = useState({})

//get all posts
useEffect(() => {
    const fetchPosts = async () => {
        const postsArray = await getPosts()
        setPosts(postsArray)
    }
    fetchPosts()
    const emptyPost = {
        id: null,
        title: "",
        body: "",
        userId: currentUser.id,
        topicId: null,
        date: null
    }
    setNewPost(emptyPost);

}, [])

useEffect(() => {
const getCurrentUserObj = async () => {
    const userObj = await getUserById(currentUser.id);
    setCurrentUserObj(userObj);
}
getCurrentUserObj();
}, [currentUser])

//find next id by posts.length+1
useEffect(() => {
    if(allPosts.length !== 0) {
        const nextId = (allPosts.length+1);
        setNewPostId(nextId);
    }
}, [allPosts])

const handleInputChange = (event) => {
    const postState = {...newPost};
    postState[event.target.name] = event.target.value;
    setNewPost(postState)
}

const handleSave = (event) => {
    event.preventDefault()
    const postSubmission = {
        id: newPostId,
        title: newPost.title,
        rate: newPost.body,
        userId: currentUser.id,
        topicId: selectedTopic,
        date: new Date()
    }
    
    submitNewPost(postSubmission)
    //.then(() => {
    //     navigate(`/`) //**************TODO: nav to MyPosts
    // });
    console.log(postSubmission);
}

return (
    <form className="new-post">
        <h2>New Post</h2>
        <fieldset>
            <div className="form-group">
                <label>Title:</label>
                <input
                type="text"
                name="title"
                value={newPost.title ? newPost.title : ""}
                onChange={handleInputChange}
                required
                className="form-control"
                />

            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
                <label>Body:</label>
                <input
                type="text"
                name="body"
                value={newPost.body ? newPost.body : ""}
                required
                onChange={handleInputChange}
                className="form-control"
                />
            </div>
        </fieldset>
        <div><TopicSelect selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}/></div>
        <fieldset>
        <div className="form-group">
                <button className="form-btn btn-primary" onClick={handleSave}>Publish</button>
            </div>
        </fieldset>
    </form>
)
}