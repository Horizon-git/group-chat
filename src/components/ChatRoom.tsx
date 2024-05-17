/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types/Message';
import { Room } from '../types/Room';
import { socket } from '../websocket';
import ChatMessage from './ChatMessage';
import ModalForm from './ModalForm';

interface Props {
  room: Room;
  chatLog: Message[];
}

const ChatRoom: React.FC<Props> = ({ room, chatLog }) => {
  const [message, setMessage] = useState<string>('');
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== '') {
      socket.send(
        JSON.stringify({
          type: 'message',
          user: localStorage.getItem('username'),
          message,
          roomId: room.id,
        }),
      );
      setMessage('');
    }
  };

  useEffect(() => {
    console.log(chatLog);
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleRenameRoom = () => {
    setShowRenameModal(true);
  };

  const handleDeleteRoom = () => {
    socket.send(JSON.stringify({ type: 'delete_room', roomId: room.id }));
  };

  const handleModalSubmit = (input: string) => {
    socket.send(
      JSON.stringify({ type: 'rename_room', newName: input, roomId: room.id }),
    );
    setShowRenameModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      {!showRenameModal && (
        <>
          <header
            className="border-b border-gray-400 px-4 pb-3 pt-2
      flex justify-between items-center"
          >
            <h2 className="text-xl">{`${room.name}`}</h2>
            <div>
              <button
                type="button"
                className="bg-blue-500 text-white px-4
            py-2 rounded hover:bg-blue-600 mr-2"
                onClick={handleRenameRoom}
              >
                Rename room
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2
                rounded hover:bg-red-600"
                onClick={handleDeleteRoom}
              >
                Delete room
              </button>
            </div>
          </header>
          <div className="flex-grow px-4 pt-2 h-96">
            <div className="chat-box h-full overflow-y-auto" ref={chatBoxRef}>
              {chatLog
                .filter(item => item.roomId === room.id)
                .map(msg => (
                  <ChatMessage
                    key={msg.id}
                    user={msg.user}
                    message={msg.message}
                  />
                ))}
            </div>
          </div>
          <div className="p-4 bg-transparent">
            <form
              onSubmit={e => handleSendMessage(e)}
              className="flex align-center gap-2"
            >
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="border border-gray-400 rounded px-3 py-2 w-full outline-none focus:shadow-md focus:border-gray-600 transition-all"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white
                px-4 py-2 rounded hover:bg-blue-600 transition-all"
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}
      {showRenameModal && (
        <ModalForm onSubmit={handleModalSubmit} buttonText="Rename room" />
      )}
    </div>
  );
};

export default ChatRoom;
