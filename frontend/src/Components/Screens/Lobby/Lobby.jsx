import React, { useState, useCallback, useEffect } from 'react';
import "./Lobby.css";
import { useSocket } from "../../../context/SocketProvider";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const Lobby = () => {
    const [email, setEmail] = useState();
    const [room, setRoom] = useState();
    const socket = useSocket();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", { email, room });
    }, [email, room, socket]);

    const handleRoomJoin = useCallback((data) => {
        console.log("WTF");
        const { room } = data;
        navigate(`/room/${room}`);
    }, [navigate]);

    useEffect(() => {
        socket.on("room:join", handleRoomJoin);
        return () => {
            socket.off("room:join", handleRoomJoin);
        }
    }, [socket, handleRoomJoin]);

    return (
        <>
            <div className="lobby_container flex justify-center items-center
             absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
            ">
                <div className='lobby flex flex-col justify-center items-center'>
                    <h3 className='txt_ text-center lobby_header' >Lobby</h3>
                    <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                        <input
                            className='modern_btn_ in_feild'
                            placeholder='Email'
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className='modern_btn_ in_feild'
                            placeholder='Room'
                            type="text"
                            id="room"
                            value={room}
                            onChange={e => setRoom(e.target.value)}
                        />
                        <button className='join_btn bg-sky-600 hover:bg-sky-500'>Join</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Lobby;