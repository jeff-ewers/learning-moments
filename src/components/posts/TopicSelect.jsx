import { useState, useEffect } from "react"
import { getTopics } from "../../services/postService.js";

export const TopicSelect = ({selectedTopic, setSelectedTopic}) => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then(topicArray => {
            setTopics(topicArray);
        })
    }, [])

    return (<select id="topic-select" onChange={e => setSelectedTopic(e.target.value)}>
        {topics.map((topic) => {
            return (<option key= {topic.id} value={topic.id}>{topic.name}</option>)
        })}
    </select>)

}