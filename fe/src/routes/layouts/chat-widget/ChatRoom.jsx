import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";

// Establish connection with the server
const socket = io('http://localhost:3000');

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  // Function to handle sending a message
  const sendMessage = () => {
    if (messageText.trim()) {
      socket.emit('message', messageText);
      setMessageText('');
    }
  };

  // Function to handle input change
  const handleChange = (event) => {
    setMessageText(event.target.value);
  };

  // Function to handle sending message on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // Setup to receive messages from server
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages(messages => [...messages, message]);
    };

    socket.on('message', receiveMessage);

    // Cleanup on component unmount
    return () => {
      socket.off('message', receiveMessage);
    };
  }, []);

  return (
    <div className="chat-room">
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p> // Display each message in a new paragraph
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={messageText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;