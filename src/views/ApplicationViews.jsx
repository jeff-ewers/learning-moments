import { AllPosts } from "../components/posts/AllPosts.jsx"
import { Routes, Route, Outlet } from "react-router-dom"
import { TopicSelect } from "../components/posts/TopicSelect.jsx"
import { NavBar } from "../components/nav/NavBar.jsx"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { useState, useEffect } from "react"
import { EditPost } from "../components/posts/EditPost.jsx"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user")
    const learningUserObject = JSON.parse(localLearningUser)
    setCurrentUser(learningUserObject)
    }, [])

    return <>
    <Routes>
        <Route path="/" element={<>
        <NavBar />
        <Outlet />
        </>}>
        <Route index element={<AllPosts />} />
            <Route path="posts/*">
                <Route index element={<AllPosts />} />
                <Route path=":postId" element={<PostDetails />} />
                <Route path="new" element={<EditPost currentUser={currentUser}/>} />
            </Route>

        </Route>
    </Routes></>

    // return (
    //     <>
    //         <NavBar />
    //         <Routes>
    //             <Route path="/" element={<Outlet />}>
    //                 <Route index element={<AllPosts />} />
    //                 <Route path="posts">
    //                     <Route index element={<AllPosts />} />
    //                     <Route path=":postId" element={<PostDetails />} />
    //                 </Route>
    //             </Route>
    //         </Routes>
    //     </>
    // )
}