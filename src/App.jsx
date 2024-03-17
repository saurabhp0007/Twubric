import React, { useState, useEffect } from 'react';
import './App.css';
import UserCard from './components/UserCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Meteors from './components/ui/meteors';

function App() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Fetching the data 
    fetch('https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const sortUsers = (criteria) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortDirection('asc');

    }

  };

  const filteredUsers = users.filter(user => {
    if (!startDate || !endDate) return true; 
    const userJoinDate = new Date(user.join_date * 1000);
    return userJoinDate >= startDate && userJoinDate <= endDate;
  });

  const sortedUsers = filteredUsers.slice().sort((a, b) => {
    if (!sortBy) return 0;
    if (sortDirection === 'asc') {
      return a.twubric[sortBy] - b.twubric[sortBy];
    } else {
      return b.twubric[sortBy] - a.twubric[sortBy];
    }
  });

  const removeUser = (userId) => {
    setUsers(users.filter(user => user.uid !== userId));
  };

  const getSortDirectionText = () => {
    return sortDirection === 'asc' ? 'Ascending' : 'Descending';
  };

  const removeDateRange = () => {
    setStartDate(null);
    setEndDate(null);
  }


  return (
    <div className="bg-gray-800">
      <h1 className="text-7xl font-bold p-8 bg-gradient-to-r from-yellow-500 to-purple-500 text-transparent bg-clip-text">
        Twubric!
      </h1>


      <div className='flex flex-col md:flex-row m-2 p-4 gap-3 items-center '>
        <div className="">
          <div className=" w-full h-full relative">
            <div className="absolute inset-0 h-full  bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-4 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className='  m-2 w-fit rounded-xl py-16 justify-between'>
                <div className='flex flex-row items-center justify-between'>
                  <span className='m-2 p-2 text-2xl text-slate-100'>Date Picker</span>
                  <span className='m-2 p-2 text-xl bg-orange-700 cursor-pointer rounded-full text-slate-100' onClick={removeDateRange}>Remove Date</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 m-2 h-full">

                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    dateFormat="yyyy"
                    showMonthYearPicker
                    placeholderText="To Year"
                    className='border border-gray-100 rounded-xl p-2 bg-slate-700 z-10'
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    dateFormat="MMMM yyyy"
                    showMonthYearPicker
                    placeholderText="To Year"
                    className='border border-gray-100 rounded-xl p-2 bg-slate-700'
                  />
                </div>

              </div>
              <Meteors number={20} />
            </div>
          </div>
        </div>

        <div className="">
          <div className=" w-full relative">
            <div className="absolute inset-0  bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-4 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className='m-2 w-fit rounded-xl bg-gray-900 py-16'>
                <span className='text-2xl p-2 ml-2 text-slate-100'>
                  Sort By : ({getSortDirectionText()})
                </span>

                <div className="flex md:flex-row flex-col  mb-4  p-5 m-2 w-fit gap-4 ">

                  <button className={`mr-2 ${sortBy === 'total' && 'bg-gray-600 rounded-xl p-2'} text-slate-100`} onClick={() => sortUsers('total')}>Twubric Score</button>
                  <button className={`mr-2 ${sortBy === 'friends' && 'bg-gray-600 rounded-xl p-2'} text-slate-100`} onClick={() => sortUsers('friends')}>Friends</button>
                  <button className={`mr-2 ${sortBy === 'influence' && 'bg-gray-600 rounded-xl p-2'} text-slate-100`} onClick={() => sortUsers('influence')}>Influence</button>
                  <button className={`mr-2 ${sortBy === 'chirpiness' && 'bg-gray-600 rounded-xl p-2'} text-slate-100`} onClick={() => sortUsers('chirpiness')}>Chirpiness</button>
                </div>
              </div>
              <Meteors number={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedUsers.map(user => (
          <UserCard key={user.uid} user={user} onRemove={removeUser} />
        ))}
      </div>
    </div>
  );
}

export default App;

