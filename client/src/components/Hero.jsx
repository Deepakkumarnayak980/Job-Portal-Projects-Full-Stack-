import React, { useContext, useRef } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

function Hero() {

    const {setSearchFilter,setIsSearched}=useContext(AppContext)


    const titleRef=useRef(null)
    const locationRef=useRef(null)

    const onSearch= ()=>{
        setSearchFilter({
            title:titleRef.current.value,
            location:locationRef.current.value
        })
        setIsSearched(true)
        
        

    }


    return (
        <div className="container 2xl:px-20 mx-auto my-10">
            <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
                <h2 className="text-2xl sd:text-3xl lg:text-4xl font-bold mb-4">
                    Over 10,000+ jobs to apply
                </h2>
                <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
                    Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
                </p>
                <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto">
                    {/* Search Input */}
                    <div className="flex items-center bg-white shadow rounded p-2">
                        <img
                            src={assets.search_icon}
                            alt="Search Icon"
                            className="w-6 h-6 mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Search for Jobs"
                            className="flex-grow text-sm p-2 rounded outline-none"
                            ref={titleRef}
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex items-center bg-white shadow rounded p-2">
                        <img
                            src={assets.location_icon}
                            alt="Location Icon"
                            className="w-6 h-6 mr-2"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className="flex-grow text-sm p-2 rounded outline-none"
                            ref={locationRef}
                        />
                    </div>
                    <button onClick={onSearch} className="bg-blue-600 px-6 py-2 rounded text-white m-1">Search</button>
                </div>
            </div>

            <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
                <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                    <p className='font-medium'>Trusted by</p>
                    <img className='h-6' src={assets.microsoft_logo} />
                    <img className='h-6' src={assets.accenture_logo} />
                    <img className='h-6' src={assets.amazon_logo} />
                    <img className='h-6' src={assets.adobe_logo} />
                    <img className='h-6' src={assets.walmart_logo} />
                    <img className='h-6' src={assets.samsung_logo} />
                    <img className='h-6' src={assets.accenture_logo}/>
                </div>
' 
            </div>
        </div>
    );
}

export default Hero;