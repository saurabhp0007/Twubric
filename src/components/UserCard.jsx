import React from 'react';
import Meteors from '../components/ui/meteors'

const UserCard = ({ user, onRemove }) => {
  const { uid, username, image, fullname, twubric, join_date } = user;

  const handleRemove = () => {
    onRemove(uid); 
  };

  return (

    <div className="">
      <div className=" w-full relative">
        <div className="absolute inset-0  bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            <img src={image} alt={username} className="w-24 h-24 rounded-full pb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-200">{fullname}</h2>
            <p className="text-gray-200 mb-2">Username: {username}</p>
            <p className="text-gray-200 mb-2">Join Date: {new Date(join_date * 1000).toLocaleDateString()}</p>
            <p className="text-gray-200 mb-2">Total Twubric Score: {twubric.total}</p>
            <p className="text-gray-200 mb-2">Friends: {twubric.friends}</p>
            <p className="text-gray-200 mb-2">Influence: {twubric.influence}</p>
            <p className="text-gray-200 mb-2">Chirpiness: {twubric.chirpiness}</p>
            <button onClick={handleRemove} className="bg-red-500 text-white px-3 py-1 rounded-xl mt-2">Remove</button>

          </div>
          <Meteors number={50} />
        </div>
      </div>
    </div>
  );
};

export default UserCard;


