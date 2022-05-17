import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CommentsContext = createContext();

const CommentsContextComponent = ({ children }) => {
    const [commentsCount, setCommentsCount] = useState(0);

    const updateCommentsCount = async () => {
        const { data } = await axios.get('/api/blogposts/getcommentcount');
        setCommentsCount(data.count);
    }

    useEffect(() => {
        updateCommentsCount();
    }, []);

    return (
        <CommentsContext.Provider value={{ commentsCount, updateCommentsCount }}>
            {children}
        </CommentsContext.Provider>
    )
}

const useCommentsCount = () => {
    return useContext(CommentsContext);
}

export { CommentsContextComponent, useCommentsCount };

