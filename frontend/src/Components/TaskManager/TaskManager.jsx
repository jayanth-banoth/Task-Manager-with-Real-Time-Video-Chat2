import React, { useEffect, useState,useCallback } from 'react';
import "./TaskManager.css";
import "./scrollbar.css";
import { IoHome } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getUserComTasks, getUserImpTasks, getUserTasks, updateTask } from '../../Action/taskAction';
import Task from "./Task/Task";
import { useAlert } from "react-alert";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";

const TaskManager = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [state, setState] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [toggleImp, setToggleImp] = useState(false);
    const [toggleComplete, setToggleComplete] = useState(false);
    const [childData, setChildData] = useState(false);
    const [taskId, setTaskId] = useState();

    const { tasks, error, message } = useSelector((state) => state.task);

    // Callback function to receive data from child
    const handleChildData = (dataFromChild) => {
        setChildData(dataFromChild);
    };

    const handleChildObject = (object) => {
        console.log(object);
        setTitle(object.title);
        setDescription(object.description);
        setToggleImp(object.toggleImp);
        setToggleComplete(object.toggleComplete);
        setTaskId(object.taskId);
    }

    const handleChangeChildData = () => {
        setChildData(false);
    }

    const handleAddTask = () => {
        setState(!state);
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert.error('Title and Description are required.');
            return;
        }
        await dispatch(createTask({ title, description, toggleImp, toggleComplete }));
        dispatch(getUserTasks());
        setState(false);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert.error('Title and Description are required.');
            return;
        }
        await dispatch(updateTask({ title, description, toggleImp, toggleComplete, taskId }));
        dispatch(getUserTasks());
        setChildData(false);
    }

    const getAllTasks =useCallback(()=>{
        dispatch(getUserTasks());
    },[dispatch]);

    const getImpTasks = () => {
        dispatch(getUserImpTasks());
    }

    const getComTasks = () => {
        dispatch(getUserComTasks());
    }

    useEffect(() => {
        getAllTasks();
    }, [getAllTasks]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, alert, message]);

    return (
        <>
            <div className='flex flex-row justify-evenly items-center
            absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'
            >
                <div className="left_col flex flex-col">
                    <div className="profileBox"></div>
                    <div className="sideBar flex flex-col">
                        <ul className='flex flex-col'>
                            <li>
                                <IoHome className="icon_baba text-white" /> <Link to="/">Home</Link>
                            </li>
                            <li onClick={getAllTasks}>
                                <GiHamburgerMenu className='text-white icon_baba' /><p to="/allTasks">All Tasks</p>
                            </li >
                            <li onClick={getImpTasks}>
                                <FaTasks className='text-white icon_baba' /><p to="/important">Important</p>
                            </li>
                            <li onClick={getComTasks}>
                                <FaCalendarCheck className='text-white icon_baba' /><p to="/completed">Completed</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right_col">
                    <div className="head_txt flex flex-row items-center justify-between">
                        <span className='task_header text-white'>Tasks</span>
                        <div onClick={handleAddTask} className="circle_ctn flex justify-center items-center">
                            <FaPlus className='plus_btn text-white' />
                        </div>
                    </div>
                    <div className="task_box grid grid-cols-3 justify-items-center">
                        {tasks && tasks.map((task) => (
                            <Task
                                key={task._id}
                                title={task.title}
                                description={task.description}
                                toggleImp={task.toggleImp}
                                toggleComplete={task.toggleComplete}
                                onData={handleChildData}
                                onDataObject={handleChildObject}
                                taskId={task._id}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {state && (<div className="addTaskBox flex justify-center items-center">
                <form className="fillBox absolute flex flex-col items-center" onSubmit={handleSumbit}>
                    <div className="headCreateTask wid_int flex item-center">
                        <p className='flex items-center'>  Create a Task </p>
                    </div>
                    <div className="title wid_int">
                        Title
                    </div>
                    <input
                        className='inputTask1 wid_int'
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <div className="description wid_int">
                        Description
                    </div>
                    <textarea
                        className='inputTask2 wid_int'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="toggleBox1 flex flex-row items-center justify-between wid_int">
                        <div className="toggleText text-white">Toggle Completed</div>
                        <input
                            type="checkbox"
                            checked={toggleComplete}
                            onChange={e => setToggleComplete(e.target.checked)}
                        />
                    </div>
                    <div className="toggleBox2 flex flex-row items-center justify-between wid_int">
                        <div className="toggleText text-white">Toggle Important</div>
                        <input
                            type="checkbox"
                            checked={toggleImp}
                            onChange={e => setToggleImp(e.target.checked)}
                        />
                    </div>
                    <div className="addMargin wid_int flex items-center justify-end">
                        <button type='submit' className="createIcon bg-blue-500 hover:bg-blue-400 hover:cursor-pointer flex flex-row justify-evenly items-center">
                            <FaPlus className='icon_style2' />
                            <span className='text-white title'>Create Task</span>
                        </button>
                    </div>
                </form>
            </div>)}
            {childData && (<div className="addTaskBox flex justify-center items-center">
                <form onSubmit={handleUpdate} className="fillBox absolute flex flex-col items-center">
                    <div className="headCreateTask wid_int flex item-center">
                        <p className='flex items-center'>  Update Task </p>
                    </div>
                    <div className="title wid_int">
                        Title
                    </div>
                    <input
                        className='inputTask1 wid_int'
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <div className="description wid_int">
                        Description
                    </div>
                    <textarea
                        className='inputTask2 wid_int'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <div className="toggleBox1 flex flex-row items-center justify-between wid_int">
                        <div className="toggleText text-white">Toggle Completed</div>
                        <input
                            type="checkbox"
                            checked={toggleComplete}
                            onChange={e => setToggleComplete(e.target.checked)}
                        />
                    </div>
                    <div className="toggleBox2 flex flex-row items-center justify-between wid_int">
                        <div className="toggleText text-white">Toggle Important</div>
                        <input
                            type="checkbox"
                            checked={toggleImp}
                            onChange={e => setToggleImp(e.target.checked)}
                        />
                    </div>
                    <div className="addMargin wid_int flex items-center justify-end">
                        <button type='submit' className="createIcon bg-blue-500 hover:bg-blue-400 hover:cursor-pointer flex flex-row justify-evenly items-center">
                            <GrUpdate className='icon_style2' />
                            <span className='text-white title'>Update Task</span>
                        </button>
                    </div>
                </form>
            </div>)}
            {state && <div onClick={handleAddTask} className="blackBox"></div>}
            {childData && <div onClick={handleChangeChildData} className="blackBox"></div>}
        </>
    );
}

export default TaskManager;