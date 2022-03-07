import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function ViewProduct()
{
    const [Loading,setLoading] = useState(true);
     const [ProductList,setProductList] = useState([]);
    useEffect(() => {
        document.title = "View Product";
        axios.get(`/api/view-product`).then(res =>{
            if (res.status === 200)
            {
                setProductList(res.data.products);
                setLoading(false);
            }
        });
    },[]);

    var viewProduct_HTMLTABLE = "";

    if (Loading)
    {
        return <h4>Loading Product...</h4>
    }
    else
    {
      viewProduct_HTMLTABLE =   ProductList.map((item) =>{
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name}/></td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button"  className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        });
        // viewProduct_HTMLTABLE = ProductList.map((item) =>{
        //     return (
        //         <tr key={item.id}>
        //             <td>{item.id}</td>
        //             <td>{item.name}</td>
        //             <td>{item.slug}</td>
        //             <td>{item.status}</td>
        //             <td>
        //                 <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
        //             </td>
        //             <td>
        //                 {/*<button type="button" onClick={(e) => deleteCategory(e,item.id)} className="btn btn-danger btn-sm">Delete</button>*/}
        //             </td>
        //         </tr>
        //     )
        // });
    }
    return(
        <div className="card px-4 mt-3">
            <div className="card-header">
                <h4>View Product
                    <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                </h4>
            </div>
            <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                    <th>Category Name</th>
                                        <th>Product Name</th>
                                    <th>Selling Price</th>
                                    <th>Image</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    </tr>
                                </thead>
                            <tbody>
                            {viewProduct_HTMLTABLE}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    )
}

export default ViewProduct;