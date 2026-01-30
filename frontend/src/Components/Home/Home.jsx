import React, { Fragment } from 'react';
import "./Home.css";
import Navbar from '../layout/Navbar/Navbar';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Fragment>
            <Navbar />
            <div className='container flex justify-center items-center body_
            absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
            '>
                <div className='header flex flex-col items-center'>
                    <h1 className='txt_ text-center'>Organize your Projects, Manage your Tasks.</h1>
                    <Link to="/register" className='start_btn bg-sky-600 hover:bg-sky-500 text-white'>Start for free</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;