import React from "react";
import useForm from "../hooks/useForm";
import axios from 'axios';
import {useHistory} from 'react-router-dom';


const AdminPage = () => {
    const [formData, setFormData] = useForm({title: '', content: ''});
    const history = useHistory();
    
    const onSubmitClick = async () => {
        const {data} = await axios.post('/api/blogposts/addpost', formData);
        history.push(`/viewblog/${data.id}`);
    }

    return (
        <div className="col-md-8 offset-md-2 card card-body bg-light">
            <h3>Add new post</h3>
            <input onChange={setFormData}
                   value={formData.title}
                   className="form-control"
                   placeholder="Title"
                   name="title"/>
            <br/>
            <textarea onChange={setFormData}
                      value={formData.content}
                      name="content"
                      placeholder="What's on your mind?"
                      className="form-control"
                      rows="20"/>
            <br/>
            <button onClick={onSubmitClick} className="btn btn-primary">Submit</button>
        </div>
    );
}

export default AdminPage;
