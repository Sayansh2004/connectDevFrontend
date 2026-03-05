import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'

export default function Chat() {

  const loggedInUser = useSelector((store) => store.user)
  const { targetUserId } = useParams()

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [socket, setSocket] = useState(null)

  const userId = loggedInUser?._id


  useEffect(() => {

    if (!userId) return

    const socketConnection = createSocketConnection()
    setSocket(socketConnection)

    socketConnection.emit("joinChat", { targetUserId, userId })

    socketConnection.on("messageRecieved", ({ firstName, newMessage }) => {

      setMessages((prev) => [
        ...prev,
        { firstName, text: newMessage }
      ])

    })

    return () => {
      socketConnection.disconnect()
    }

  }, [userId, targetUserId])


  const sendMessage = () => {

    if (!newMessage.trim()) return

    socket.emit("sendMessage", {
      firstName: loggedInUser?.firstName,
      userId,
      targetUserId,
      newMessage
    })

    setMessages((prev) => [
      ...prev,
      { firstName: loggedInUser?.firstName, text: newMessage }
    ])

    setNewMessage("")
  }


  return (
    <div className="w-1/2 mx-auto bg-base-200 rounded-2xl shadow-xl m-6 h-[75vh] flex flex-col">

      {/* Header */}

      <div className="p-5 border-b border-base-300 bg-base-100 rounded-t-2xl flex items-center gap-4">

        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://via.placeholder.com/100" alt="User" />
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-lg">
            {messages.length > 0 ? messages[0].firstName : "Chat"}
          </h1>

          <p className="text-sm opacity-60">
            Seen recently
          </p>
        </div>

      </div>


      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`chat ${message.firstName === loggedInUser?.firstName ? "chat-end" : "chat-start"}`}
          >

            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://via.placeholder.com/100" alt="User" />
              </div>
            </div>

            <div className="chat-header">
              {message.firstName}
              <time className="text-xs opacity-50 ml-2">now</time>
            </div>

            <div className="chat-bubble chat-bubble-primary">
              {message.text}
            </div>

          </div>

        ))}

      </div>


      {/* Input */}

      <div className="p-5 border-t border-base-300 bg-base-100 rounded-b-2xl flex gap-3 items-center">

        <input
            type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={sendMessage}
        >
          Send
        </button>

      </div>

    </div>
  )
}








// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { useState } from 'react';
// import { createSocketConnection } from '../utils/socket';
// import { useSelector } from 'react-redux';

// export default function Chat() {
//   const loggedInUser=useSelector((store)=>store.user);
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage,setNewMessage]=useState("")
//   const userId=loggedInUser?._id;

//   useEffect(()=>{
//     const socket=createSocketConnection();

//     socket.emit("joinChat",{targetUserId,userId});

//     socket.on("messageRecieved",({firstName,newMessage})=>{
//      setMessages([...messages],{firstName,text});
//     })

//     return ()=>{
//       socket.disconnect();
//     }
    
//   },[])

//   const sendMessage=()=>{
//     const socket=createSocketConnection();

//     socket.emit("sendMessage",{firstName:loggedInUser?.firstName,userId,targetUserId,newMessage})
//   }

//   return (
//     <div className="w-1/2 mx-auto bg-base-200 rounded-2xl shadow-xl m-6 h-[75vh] flex flex-col">

//       {/* Header */}
//       <div className="p-5 border-b border-base-300 bg-base-100 rounded-t-2xl flex items-center gap-4">
//         <div className="avatar">
//           <div className="w-12 rounded-full">
//             <img src="https://via.placeholder.com/100" alt="User" />
//           </div>
//         </div>
//         <div>
//           <h1 className="font-semibold text-lg">{messages.firstName}</h1>
//         {messages.length>0 &&  <p className="text-sm opacity-60">Seen 2 hours ago</p>}
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4">

//         {messages.map((message, index) => (
//           <div key={index} className="chat chat-start">

//             <div className="chat-image avatar">
//               <div className="w-10 rounded-full">
//                 <img src="https://via.placeholder.com/100" alt="User" />
//               </div>
//             </div>

//             <div className="chat-header">
//              {messages.firstName}
//               <time className="text-xs opacity-50 ml-2">12:45</time>
//             </div>

//             <div className="chat-bubble chat-bubble-primary">
//               {message.text}
//             </div>

//             <div className="chat-footer opacity-50">
//               Seen
//             </div>

//           </div>
//         ))}

//       </div>

//       {/* Input */}
//       <div className="p-5 border-t border-base-300 bg-base-100 rounded-b-2xl flex gap-3 items-center">
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="input input-bordered flex-1"
//           value={newMessage}
//           onChange={(e)=>setNewMessage(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={sendMessage}>
//           Send
//         </button>
//       </div>

//     </div>
//   )
// }