import { AllPosts } from "../components/posts/AllPosts.jsx"
import { Routes, Route, Outlet } from "react-router-dom"
import { TopicSelect } from "../components/posts/TopicSelect.jsx"
import { NavBar } from "../components/nav/NavBar.jsx"
import { useState, useEffect } from "react"

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
        </Route>
    </Routes></>
}