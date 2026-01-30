import { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lobby from './Components/Screens/Lobby/Lobby';
import Room from './Components/Screens/Room/Room';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import DashBoard from "./Components/Dashboard/Dashboard";
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './Action/userAction';
import Register from './Components/Register/Register';
import TaskManager from './Components/TaskManager/TaskManager';
import TextEditor from "./Components/Document/Document";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashBoard /> : <Login />} />
          <Route path="/document/:id" element={<TextEditor />} />
          <Route path="/tasks" element={isAuthenticated ? <TaskManager /> : <Login />} />
          <Route path="/lobby" element={isAuthenticated ? <Lobby /> : <Login />}></Route>
          <Route path="/room/:roomId" element={isAuthenticated ? <Room /> : <Login />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
