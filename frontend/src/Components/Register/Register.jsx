import React, { useEffect, useState } from 'react';
import "./Register.css";
import { Link } from "react-router-dom";
import login_img from "../../Images/log_image.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Action/userAction";
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { error } = useSelector((state) => state.user);

    const handleSumbit = async (e) => {
        e.preventDefault();
        await dispatch(registerUser(name, email, password));
        if (!error) {
            navigate(`/dashboard`);
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
    }, [alert, dispatch, error]);

    return (
        <div className="register_ctn flex justify-center items-center
        absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
        ">
            <div className="register_box btns_ flex flex-row items-center">
                <form className="left_box flex flex-col items-center" onSubmit={handleSumbit}>
                    <h1 className='txt_ text-left login_header'>Register</h1>
                    <div className="line_box"></div>
                    <input
                        type="text"
                        placeholder='Name'
                        className='btns  modern_btn_'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder='Email'
                        className='btns  modern_btn_'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='btns  modern_btn_'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className='big_btn bg-sky-600 hover:bg-sky-500'
                    >Sign Up</button>
                    <div className="trouble_box flex flex-col justify-between">
                        <div>
                            <div className='inline text-white'>Already have an Account?</div>
                            <Link to="/dashboard" className='text-left link_txt text-white'>LogIn</Link>
                        </div>
                    </div>
                </form>
                <div className="login_img flex justify-center items-center">
                    <img src={login_img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Register;