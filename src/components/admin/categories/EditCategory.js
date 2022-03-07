import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import {useHistory} from "react-router-dom";

function EditCategory(props)
{
    const history = useHistory();
    const [Loading,setLoading] = useState(true);
    const [CategoryInput,setCategory] = useState([]);
    const [error,setErrors] = useState([]);

    useEffect(() =>{
        const category_id = props.match.params.id;
        axios.get(`/api/edit-category/${category_id}`).then(res =>{
            if (res.data.status === 200)
            {
                setCategory(res.data.category);

            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/admin/view-category');
            }
            setLoading(false);

        });
    },[props.match.params.id,history]);
    const handleInput = (e) =>{
        e.persist();
        setCategory({...CategoryInput,[e.target.name]: e.target.value});
    }

    const updateCategory =  (e) => {
        e.preventDefault();
        const category_id = props.match.params.id;
        const data = CategoryInput;
        axios.put(`/api/update-category/${category_id}`,data).then(res =>{
            if (res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setErrors([]);

            }
            else if(res.data.status === 422)
            {
                swal("All fiels are mandetory","","error");
                setErrors(res.data.errors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/admin/view-category');
            }
        });
    }

    if (Loading)
    {
        return <h4>Loading Edit Category...</h4>
    }

    return(
        <div className="container px-4">
                <div className="card mt-4">
                    <div className="card-header">
                        <h4>Edit Category
                            <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Back</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateCategory}>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                            type="button" role="tab" aria-controls="home" aria-selected="true">Home
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags"
                                            type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="form-group mb-3">
                                        <label>Slug</label>
                                        <input type="text" name="slug" onChange={handleInput} value={CategoryInput.slug} className="form-control"/>
                                        <small className="text-danger">{error.slug}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={CategoryInput.name}  className="form-control"/>
                                        <small className="text-danger">{error.name}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <textarea  name="description" onChange={handleInput} value={CategoryInput.description} className="form-control"></textarea>

                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Status</label>
                                        <input type="checkbox" name="status" onChange={handleInput} value={CategoryInput.status} />

                                    </div>
                                </div>
                                <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                                    <div className="form-group mb-3">
                                        <label>Meta Keywords</label>
                                        <input type="text" name="keywords" onChange={handleInput} value={CategoryInput.keywords} className="form-control"/>

                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Title</label>
                                        <input type="text" name="title" onChange={handleInput} value={CategoryInput.title} className="form-control"/>
                                        <small className="text-danger">{error.title}</small>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Meta Description</label>
                                        <textarea  name="descript" onChange={handleInput} value={CategoryInput.descript} className="form-control"></textarea>

                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary px-4 float-end">Update</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default EditCategory;