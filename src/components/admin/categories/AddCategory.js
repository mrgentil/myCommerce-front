import React, {useState} from 'react';
import axios from "axios";
import swal from "sweetalert";


function AddCategory()
{
    const [CategoryInput,setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        keywords: '',
        title: '',
        descript: '',
        error_list: [],
    });

    const handleInput = (e) =>{
        e.persist();
        setCategory({...CategoryInput,[e.target.name]: e.target.value});
    }

    const SubmitCategory =  (e) => {
        e.preventDefault();
        const data = {
            slug: CategoryInput.slug,
            name: CategoryInput.name,
            description: CategoryInput.description,
            status: CategoryInput.status,
            keywords: CategoryInput.keywords,
            title: CategoryInput.title,
            descript: CategoryInput.descript,
        }
        axios.post(`/api/store-category`,data).then(res =>{
            if (res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                document.getElementById('CATEGORY_FORM').reset();

            }
            else if(res.data.status === 400)
            {
                setCategory({...CategoryInput ,error_list: res.data.errors});
            }

        });
    }
var display_errors = [];
    if (CategoryInput.error_list)
    {
        display_errors = [
            CategoryInput.error_list.slug,
            CategoryInput.error_list.name,
            CategoryInput.error_list.title,
        ];
    }
    return(

        <div className="container-fluid px-4">
            {
                display_errors.map( (item) => {
                    return(
                        <p className="mb-1" key={item}>{item}</p>
                    )
                })
            }

            <h1 className="mt-4">Add Category</h1>
            <form onSubmit={SubmitCategory} id="CATEGORY_FORM">
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
                        <span>{CategoryInput.error_list.slug}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label>Name</label>
                        <input type="text" name="name" onChange={handleInput} value={CategoryInput.name}  className="form-control"/>

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

                    </div>
                    <div className="form-group mb-3">
                        <label>Meta Description</label>
                        <textarea  name="descript" onChange={handleInput} value={CategoryInput.descript} className="form-control"></textarea>

                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </form>
        </div>
    )
}
export default AddCategory;