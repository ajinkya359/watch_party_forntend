import React from 'react';
import './Message.css'

function Message(props) {
  return <div className='message_body'>
    <div className='user_name' >
      {props.user_name}
    </div>
    <div className='message_content'>
  {props.content}
    </div>
  </div>;
}

export default Message;
