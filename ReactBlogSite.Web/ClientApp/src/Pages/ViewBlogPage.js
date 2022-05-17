import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {format} from 'date-fns';
import Comment from "../components/Comment";
import AddCommentForm from "../components/AddCommentForm";

const ViewBlogPage = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [blogPost, setBlogPost] = useState({title: '', content: '', dateCreated: ''});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            const {data} = await axios.get(`/api/blogposts/getblogpost?id=${id}`);
            const {title, content, dateCreated, comments} = data;
            setBlogPost({title, content, dateCreated});
            setComments(comments);
            setIsLoading(false);
        }
        getPost();
    }, [id]);

    const onCommentSubmission = async () => {
        const {data} = await axios.get(`/api/blogposts/getcomments?blogpostid=${id}`);
        setComments(data);
    }

    return (
        <div className="row">
            <div className="col-lg-8">
                {isLoading && <h2>Loading...</h2>}
                {!isLoading &&
                <>
                    <h1 className="mt-4">{blogPost.title}</h1>
                    <p className="lead">
                        by Avrumi Friedman
                    </p>
                    <hr/>
                    <p>Posted on {format(new Date(blogPost.dateCreated), 'cccc MMMM Lo, yyyy')}</p>
                    <hr/>
                    {blogPost.content.split('\n').map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
                    <hr/>
                    <AddCommentForm onSubmission={onCommentSubmission}/>

                    {comments.map(c => <Comment comment={c} key={c.id}/>)}
                </>
                }
            </div>

        </div>
    )
}

export default ViewBlogPage;