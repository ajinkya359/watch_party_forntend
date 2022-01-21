import React, { useEffect, useState } from "react";
import "./Chat.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message/Message";
import { socket } from "./SocketConnection";
const Chat = (props) => {
  socket.connect()
  const [messages, setMessages] = useState([]);
  const sendMessage = () => {
    const message2 = document.getElementById("message");
    console.log("sending_message_to_server", message2.value);
    socket.emit("send-message-to-server", {
      msg: message2.value,
      username:props.username,

        room_id:props.room_id
    },(username,msg)=>{
      const m = {
        user_name: username,
        content: msg,
      };
      setMessages((messages) => [...messages, m]);
    });
  };



  useEffect(() => {
    // socket.on('disconnect',props.username,()=>{
    //   console.log("disconnected");
    // })
    socket.on('connect',()=>{
      
      console.log("Connected")
      
      socket.emit('join-room',props.room_id,props.username,(m)=>{

        setMessages((messages) => [...messages, {user_name:m.username,content:m.msg}]);
      })
      
    })
    socket.on("recieve-message-from-server", (data) => {
      const m = {
        user_name:data.username,
        content: data.msg,
      };
      setMessages((messages) => [...messages, m]);
    });
  }, []);
  
  return (
    <div className="container">
      <div>
        <h1>Room:{props.room_id}</h1>
      </div>
      <div className="chatbox">
        <div id="message_list">
          {messages &&
            messages.map((msg, id) => (
              <Message
                key={id}
                user_name={msg.user_name}
                content={msg.content}
              />
            ))}
 
        </div>
      </div>
      <div className="TypeMessage">
        <TextField
          label="Enter message"
          className="message_input"
          variant="outlined"
          id="message"
        />
        <Button
          variant="contained"
          className="send_button"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
