import React from 'react';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet /> 
            <Footer></Footer>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />
        </div>
    );
};

export default HomeLayout;