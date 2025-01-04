import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from "react-router";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk(); // Ensure this is a function call
  const { user } = useUser();

  const navigate =useNavigate()
    const {setShowRecruiterLogin}=useContext(AppContext)

  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="Logo" />
        {
            user
            ?<div className='flex items-center gap-3'>
              <Link to={'/application'}>Applied Jobs</Link>
              <p>|</p>
              <p className='max-sm:hidden'>Hi,{user.firstName+" " +user.lastName}</p>
              <UserButton />
            </div>
            :<div className="flex gap-4 max-sm:text-xs">
            <button onClick={e => setShowRecruiterLogin(true)} className="text-gray-600">Recruiter Login</button>
            <button
              onClick={() => openSignIn()} // Call the openSignIn function here
              className="bg-blue-600 text-white px-9 sm:py-2 rounded-full"
            >
              Login
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
