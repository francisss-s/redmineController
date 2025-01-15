import React from 'react';
import { User } from '../types/User';

interface UserSelectProps {
  users: User[];
  selectedUserId: string;
  onChangeUser: (newUserId: string) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({
  users,
  selectedUserId,
  onChangeUser,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="user-select" className="mr-2 font-medium">
        Usuario:
      </label>
      <select
        id="user-select"
        value={selectedUserId}
        onChange={(e) => onChangeUser(e.target.value)}
        className="border border-gray-300 rounded p-1"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id.toString()}>
            {user.firstname} {user.lastname}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
