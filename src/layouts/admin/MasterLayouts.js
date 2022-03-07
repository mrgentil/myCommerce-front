import React from 'react';
import  '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import routes from "../../routes/routes";
import {Redirect, Route, Switch} from "react-router-dom";

const MasterLayouts = () => {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                       <Switch>
                           {
                               routes.map((route,idx) => {
                                    return(
                                        route.component && (
                                            <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={(props) =>(
                                                    <route.component {...props}/>
                                            )}
                                            />
                                        )
                                    )
                               })
                           }
                       </Switch>
                        <Redirect from="/admin" to="admin/dashboard" />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MasterLayouts;