import React from 'react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';

const BlogPost = ({post}) => {
    const { id, title, content, dateCreated, comments } = post;
    const commentCount = comments.length;
    const getContent = () => {
        if(content.length < 200) {
            return content;
        }
        
        return content.substring(0, 200) + "....";
    }
    
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h2 className="card-title">
                    <Link to={`/viewblog/${id}`}>
                        {title}
                    </Link>
                </h2>
                <p className="card-text">{getContent()}</p>
                <div className='mb-3'>
                    <small>{commentCount} comment(s)</small>
                </div>
                <Link to={`/viewblog/${id}`} className='btn btn-primary'>
                    Read More &rarr;
                </Link>
            </div>
            <div className="card-footer text-muted">
                Posted on {format(new Date(dateCreated), 'cccc MMMM Lo, yyyy')}
            </div>
        </div>
    )
}

export default BlogPost;