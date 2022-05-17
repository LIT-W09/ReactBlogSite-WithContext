import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useCommentsCount } from '../CommentsContext';


const AddCommentForm = ({ onSubmission }) => {
    const [formData, setFormData] = useState({ name: '', content: '' });
    const { id } = useParams();
    const { name, content } = formData;
    const { updateCommentsCount } = useCommentsCount();

    const onTextChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const commenterName = localStorage.getItem('commenter-name');
        if (commenterName) {
            setFormData({ name: commenterName, content: '' });
        }
    }, []);

    const onSubmitClick = async () => {
        await axios.post('/api/blogposts/addcomment', { ...formData, blogPostId: id });
        setFormData({ name, content: '' });
        localStorage.setItem('commenter-name', formData.name);
        onSubmission();
        updateCommentsCount();
    }

    return (
        <div className="card my-4">
            <h5 className="card-header">Leave a Comment:</h5>
            <div className="card-body">
                <input type="hidden" value="3003" name="postId" />
                <div className="form-group">
                    <input type="text"
                        value={name}
                        placeholder="Please enter your name"
                        className="form-control"
                        onChange={onTextChange}
                        name="name" />
                </div>
                <div className="form-group">
                    <textarea placeholder="Type your comment here but remember to be be nice..."
                        value={content}
                        name="content"
                        className="form-control"
                        onChange={onTextChange}
                        rows="3" />
                </div>
                <button disabled={!name || !content}
                    onClick={onSubmitClick}
                    className="btn btn-primary">Submit
                </button>

            </div>
        </div>
    )
}

export default AddCommentForm;