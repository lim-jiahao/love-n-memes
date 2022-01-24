import React from 'react';
import ProfileCard from './ProfileCard.jsx';

const ProfileDeck = ({ users }) => (
  <div className="overflow-hidden pt-40 w-full">
    {users.map((user) => (
      <ProfileCard key={user.name} />
    ))}
  </div>
);

export default ProfileDeck;
