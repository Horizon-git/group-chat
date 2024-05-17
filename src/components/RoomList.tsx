import React from 'react';
import { Room } from '../types/Room';
import classNames from 'classnames';

interface RoomListProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
  selectedRoom: Room | null;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  onSelectRoom,
  selectedRoom,
}) => {
  return (
    <div>
      <ul>
        {rooms.map(room => (
          <li
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className={classNames(
              'cursor-pointer',
              'rounded-md px-4 py-2 mb-2 mx-2 transition-all',
              {
                'bg-blue-500 text-white hover:bg-blue-500':
                  selectedRoom?.id === room.id,
                'hover:bg-gray-100': selectedRoom?.id !== room.id,
              },
            )}
          >
            <p className="font-bold">{room.name}</p>
            <p className="text-sm">
              <span
                className={classNames('text-blue-500 font-medium', {
                  'text-white': selectedRoom?.id === room.id,
                })}
              >
                {room.lastMessage.user}
              </span>
              {': '}
              {room.lastMessage.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
