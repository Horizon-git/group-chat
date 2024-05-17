import classNames from 'classnames';
import React from 'react';

interface MessageProps {
  user: string;
  message: string;
}

const ChatMessage: React.FC<MessageProps> = ({ user, message }) => {
  console.log(user === localStorage.getItem('username'));

  return (
    <div
      className={classNames('flex mb-2 ', {
        'justify-end': user === localStorage.getItem('username'),
      })}
    >
      <div
        className={classNames('bg-blue-500 p-3 mr-2 rounded-3xl', {
          'text-white rounded-bl-none':
            user !== localStorage.getItem('username'),
          'bg-white text-black rounded-br-none':
            user === localStorage.getItem('username'),
        })}
      >
        <p className="font-bold">{user}</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
