import React, { useState } from 'react';
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../Action/userAction';
import { v4 as uuid4 } from "uuid";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  const handleDropDown = () => {
    console.log("state has changed " + state);
    setState(!state);
  }

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    setState(false);
  }

  return (
    <nav className='navbar backdrop-blur-lg border-b border-neutral-500 fixed top-0 z-50 py-3 flex justify-center items-center'>
      <div className='flex justify-between flex-row items-center h-full in_ctn'>
        <div className="logo_box flex justify-start items-center">
          <Link className='logo_name' to="/">TM</Link>
        </div>

        <ul className='list_box flex flex-row justify-around items-center'>
          <li><Link to="/tasks" >Tasks</Link></li>
          <li><Link to={`/document/${uuid4()}`} >Doc Editor</Link></li>
          <li><Link to="/livechat">LiveChat</Link></li>
          <li><Link to="/lobby">VideoCall</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>

        {!isAuthenticated ?
          (<div className="btn_box flex flex-row justify-between items-center overflow-hidden">
            <Link className='btn modern_btn_ log_btn flex justify-center items-center' to="/dashboard">
              Log In
            </Link>
            <Link className='btn bg-sky-600 hover:bg-sky-500 flex justify-center items-center' to="/register">
              Sign Up
            </Link>
          </div>) :
          (
            <div className='profile_box flex justify-end items-center'>
              <CgProfile className='size-8 hover:cursor-pointer' onClick={handleDropDown} />
              <div
                className="dropdown true_dis z-50 absolute modern_btn_ flex flex-col justify-evenly items-center"
                id={state ? "true_dis" : "false_dis"}
              >
                <div className='hover:cursor-pointer'>Edit Profile</div>
                <HiOutlineLogout className='size-5 hover:cursor-pointer' onClick={handleLogoutUser} />
              </div>
            </div>
          )}
      </div>
    </nav>
  );
}

export default Navbar;