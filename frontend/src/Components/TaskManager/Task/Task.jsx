import React from 'react';
import { MdDelete } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import "./Task.css";
import { useDispatch } from 'react-redux';
import { deleteTask, getUserTasks } from '../../../Action/taskAction';

const Task = ({ title, description, toggleImp, toggleComplete, taskId, onData, onDataObject, onDelete }) => {
    const dispatch = useDispatch();
    const sendDataToParent = () => {
        const data = true;
        onData(data);
        onDataObject({ title, description, toggleImp, toggleComplete, taskId });
    };

    const sendDeleteToBackend = async () => {
        await dispatch(deleteTask(taskId));
        dispatch(getUserTasks());
    }

    return (
        <div className='taskContainer'>
            <div className="txt_header flex justify-center items-center text-white">
                <div className="fxBox1 overflow-ellipsis whitespace-nowrap overflow-hidden">
                    {title}
                </div>
            </div>
            <div className="txt_box text-white flex justify-center items-center">
                <div className="fxBox2 overflow-ellipsis overflow-hidden">
                    {description}
                </div>
            </div>
            <div className="btnBox flex flex-row justify-end items-center overflow-ellipsis">
                <IoCreate onClick={sendDataToParent} className='icon_style text-white' />
                <MdDelete onClick={sendDeleteToBackend} className='icon_style text-white' />
            </div>
        </div>
    )
}

export default Task;