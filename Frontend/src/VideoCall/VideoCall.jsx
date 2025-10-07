import React, { useState, useEffect, useCallback, useRef } from "react";
import VideoTile from "./VideoTile";
import CallControls from "./CallControls";
import ChatSidebar from "./ChatSidebar";
import { useSocket } from "../context/SocketProvider";
import { useParams } from "react-router";
import Peer from "peerjs";

export default function VideoCall() {

  const [chatOpen, setChatOpen] = useState(false);
  const [callActive, setCallActive] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [roomId, setRoomId] = useState();
  const [videoStatus, setVideoStatus] = useState(true);
  const [audioStatus, setAudioStatus] = useState(false);
  const peerInstance = useRef(null);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [peerId, setPeerId] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState(null);

  const { id } = useParams();
  const socket = useSocket();

  const [participants, setParticipants] = useState([
    // Example participant objects; replace with live stream refs or objects from your RTC layer
    { id: "me", name: "Yash Nema", initials: "Y", cameraOn: true, muted: true, stream: null },
    { id: "mentor", name: "Ava Mentor", initials: "A", cameraOn: true, muted: false, stream: null }
  ]);

  const userMedia = useCallback(() => {
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: videoStatus, audio: audioStatus }, (currentStream) => {
      setLocalStream(currentStream);
    }, function (err) {
      console.log('Failed to get local stream', err);
    });
  }, [videoStatus, audioStatus]);

  useEffect(() => {
    if (videoStatus || audioStatus) userMedia();
    const peer = new Peer();
    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      setPeerId(id);
    })

    peer.on('call', (call) => {
      let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      getUserMedia({ video: videoStatus, audio: audioStatus }, (stream) => {
        console.log(call);
        call.answer(stream);
        //const call = peer.call(remotePeerId, stream);
      })
    })
    peerInstance.current = peer;
    call(remotePeerId);
  }, []);

  const call = useCallback((remotePeerId) => {
    let getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({ video: videoStatus, audio: audioStatus }, (stream) => {
      const call = peerInstance.current.call(remotePeerId, stream);

      call.on('stream', (stream) => {

        setRemoteStream(stream);
        console.log("remote stream: ", stream);
      })
    })
  }, [videoStatus, audioStatus]);

  useEffect(() => {
    const startCall = async () => {
      console.log(id);
      setRoomId(id);
      socket.emit("join:room", id, peerId);

    }
    startCall();
  }, [peerId]);


  useEffect(() => {
    let t;
    if (callActive) {
      t = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(t);
  }, [callActive]);

  function formatTimer(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Example toggles — connect these to your signaling / WebRTC logic
  const toggleMute = () => {
    setAudioStatus(!audioStatus);
  };

  const toggleCamera = () => {
    setVideoStatus(!videoStatus);
  };

  const leaveCall = () => {
    // Hook in any cleanup: close tracks, signal leave, navigate away, etc.
    socket.emit("leave:room", roomId);
    setCallActive(false);
    // For demo: clear participants
    setParticipants([]);
  };

  const handleRoomJoined = useCallback(({ room, socketId }) => {
    console.log(`Joined room ${room} with ID ${socketId}`);
    socket.emit("check:ready", roomId);
  })

  const handleRoomFull = useCallback(() => {
    console.log("room full");
  })

  const handleReady = useCallback((peerId) => {
    console.log("ready: ", peerId);
    setRemotePeerId(peerId);
    if (audioStatus || videoStatus) {
      call(peerId);
    }
  })

  useEffect(() => {
    socket.on("room:joined", handleRoomJoined);
    socket.on("room:full", handleRoomFull);
    socket.on("room:ready", handleReady);
    return () => {
      socket.off("room:joined", handleRoomJoined);
      socket.off("room:full", handleRoomFull);
      socket.off("room:ready", handleReady);
    }
  }, [handleRoomJoined, socket, handleReady]);

  // Layout: left = video area, right = chat (toggle-able)
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Video area */}
      <div className={`flex-1 p-4 flex flex-col ${chatOpen ? "lg:pr-0" : ""}`}>
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-gradient-to-br from-red-900 to-red-700 shadow-inner">
          {/* Top-right small status / mute icon might go here */}
          <div className="absolute top-4 left-6 text-sm text-white/90 flex items-center gap-3 z-10">
            <span className="font-medium">{participants.find(p => p.id === "mentor")?.name || "Mentor"}</span>
            <span className="text-xs opacity-80">|</span>
            <span className="text-xs opacity-80">{formatTimer(timerSeconds)}</span>
          </div>

          {/* Grid of participant tiles (single large tile for primary) */}
          <div className="h-full w-full flex items-center justify-center p-6">
            {/* Show a large primary tile and smaller secondary tiles can be layered or in a corner */}
            {participants.length === 0 ? (
              <div className="text-center">
                <h3 className="text-xl font-semibold">Call ended</h3>
                <p className="text-sm text-white/80 mt-2">You left the meeting.</p>
              </div>
            ) : (
              // <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
              //   {participants.map(p => (
              //     <VideoTile key={p.id} participant={p} />
              //   ))}
              // </div>
              <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <VideoTile participant={participants[0]} stream={remoteStream} />
                <VideoTile participant={participants[1]} videoStatus={videoStatus} audioStatus={audioStatus} stream={localStream} />
              </div>
            )}
          </div>

          {/* Bottom controls overlay */}
          <div className="absolute left-0 right-0 bottom-0 px-6 pb-6">
            <CallControls
              videoStatus={videoStatus}
              audioStatus={audioStatus}
              onToggleMute={() => toggleMute()}
              onToggleCamera={() => toggleCamera()}
              onEndCall={() => {
                if (confirm("End call for everyone?")) leaveCall();
              }}
              onToggleChat={() => setChatOpen(open => !open)}
            />
          </div>
        </div>
      </div>

      {/* Chat sidebar (desktop) */}
      <div className={`hidden lg:block w-96 p-4`}>
        <ChatSidebar onClose={() => setChatOpen(false)} />
      </div>

      {/* Chat drawer for mobile (optional) */}
      {chatOpen && (
        <div className="fixed bottom-16 right-4 block lg:hidden z-30">
          <button
            onClick={() => setChatOpen(false)}
            className="bg-white/10 text-white px-3 py-2 rounded-md backdrop-blur"
          >
            Close chat
          </button>
        </div>
      )}
    </div>
  );
}
