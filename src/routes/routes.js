import React from "react";
import Dashboard from "../components/admin/Dashboard";
import Profile from "../components/admin/Profile";
import AddCategory from "../components/admin/categories/AddCategory";
import ViewCategory from "../components/admin/categories/ViewCategory";
import EditCategory from "../components/admin/categories/EditCategory";
import AddProduct from "../components/admin/products/AddProduct";
import ViewProduct from "../components/admin/products/ViewProduct";
import EditProduct from "../components/admin/products/EditProduct";


const routes = [
    { path: '/admin' , export: true , name: 'Admin' },
    { path: '/admin/dashboard' , export: true , name: 'Dashboard', component: Dashboard },

    { path: '/admin/add-category' , export: true , name: 'Category' , component: AddCategory},
    { path: '/admin/view-category' , export: true , name: 'ViewCategory' , component: ViewCategory},
    { path: '/admin/edit-category/:id' , export: true , name: 'EditCategory' , component: EditCategory},

    { path: '/admin/add-product' , export: true , name: 'AddProduct' , component: AddProduct},
    { path: '/admin/view-product' , export: true , name: 'ViewProduct' , component: ViewProduct},
    { path: '/admin/edit-product/:id' , export: true , name: 'EditProduct' , component: EditProduct},

    { path: '/admin/profile' , export: true , name: 'Profile' , component: Profile},
];

export default routes;