import React, { useEffect, useCallback, useState, Fragment } from 'react'
import ReactPlayer from 'react-player'
import peer from '../service/peer'
import { useSocket } from '../../../context/SocketProvider'
import './Room.css'
import { IoSend } from "react-icons/io5";
import { IoCall } from "react-icons/io5";

//final code

const RoomPage = () => {
  const socket = useSocket()
  const [remoteSocketId, setRemoteSocketId] = useState(null)
  const [myStream, setMyStream] = useState()
  const [remoteStream, setRemoteStream] = useState()

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`)
    setRemoteSocketId(id)
  }, [])

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    const offer = await peer.getOffer()
    socket.emit('user:call', { to: remoteSocketId, offer })
    setMyStream(stream)
  }, [remoteSocketId, socket])

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      setMyStream(stream)
      console.log(`Incoming Call`, from, offer)
      const ans = await peer.getAnswer(offer)
      socket.emit('call:accepted', { to: from, ans })
    },
    [socket]
  )

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream)
    }
  }, [myStream])

  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      await peer.setLocalDescription(ans)
      console.log('Call Accepted!')
      sendStreams()
    },
    [sendStreams]
  )

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer()
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
  }, [remoteSocketId, socket])

  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)
    }
  }, [handleNegoNeeded])

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer)
      socket.emit('peer:nego:done', { to: from, ans })
    },
    [socket]
  )

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans)
  }, [])

  const handleSharingTrack = useCallback(async ev => {
    const rStream = ev.streams
    console.log('GOT TRACKS!!')
    setRemoteStream(rStream[0])
  }, [])

  useEffect(() => {
    peer.peer.addEventListener('track', handleSharingTrack)
    return () => {
      peer.peer.removeEventListener('track', handleSharingTrack)
    }
  }, [handleSharingTrack])

  useEffect(() => {
    socket.on('user:joined', handleUserJoined)
    socket.on('incomming:call', handleIncommingCall)
    socket.on('call:accepted', handleCallAccepted)
    socket.on('peer:nego:needed', handleNegoNeedIncomming)
    socket.on('peer:nego:final', handleNegoNeedFinal)

    return () => {
      socket.off('user:joined', handleUserJoined)
      socket.off('incomming:call', handleIncommingCall)
      socket.off('call:accepted', handleCallAccepted)
      socket.off('peer:nego:needed', handleNegoNeedIncomming)
      socket.off('peer:nego:final', handleNegoNeedFinal)
    }
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal
  ])

  return (
    <>
      <div
        className='room_ctn flex flex-row
       absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]
      '
      >
        <div className='room_ctn background body_'>
          <div className='myStream_box flex justify-center items-center'>


            {myStream && (
              <>
                <ReactPlayer
                  className="myPlayer"
                  playing
                  muted
                  height='200px'
                  url={myStream}
                />
              </>
            )}
            {remoteStream && (
              <>
                <ReactPlayer
                  className="remotePlayer"
                  playing
                  muted
                  height='200px'
                  url={remoteStream}
                />
              </>
            )}
          </div>
          <div className='remoteStream_box flex justify-center items-center'>
            <div className='user_ctn flex flex-col justify-evenly items-center'>

              <h4 className='text-white h4_tag'>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
              <div className="flex flex-row send_box justify-between items-center">
                {myStream && (
                  <div className="sendIcon flex flex-col justify-center items-center hover:cursor-pointer modern_btn_">
                    <IoSend className='text-white' />
                    <button className='text-white btn_text_size' onClick={sendStreams}>Send Stream</button>
                  </div>
                )}
                {remoteSocketId && (
                  <div className="callIcon flex flex-col justify-center items-center hover:cursor-pointer">
                    <IoCall className='text-white' />
                    <button className='text-white btn_text_size' onClick={handleCallUser}>CALL</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default RoomPage
