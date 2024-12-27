import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* Search Filter */}
                {isSearched && (searchFilter.title || searchFilter.location) && (
                    <>
                        <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                        <div className='mb-4 text-gray-600'>
                            {searchFilter.title && (
                                <span className='inline-flex items-center gap-2.5 bg-blue-50 border-blue-200 px-4 py-1.5 rounded'>
                                    {searchFilter.title}
                                    <img
                                        onClick={() => setSearchFilter(prev => ({ ...prev, title: '' }))}
                                        className='cursor-pointer'
                                        src={assets.cross_icon}
                                        alt='Remove title filter'
                                    />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className='ml-3 inline-flex items-center gap-2.5 bg-red-50 border-red-200 px-4 py-1.5 rounded'>
                                    {searchFilter.location}
                                    <img
                                        onClick={() => setSearchFilter(prev => ({ ...prev, location: '' }))}
                                        className='cursor-pointer'
                                        src={assets.cross_icon}
                                        alt='Remove location filter'
                                    />
                                </span>
                            )}
                        </div>
                    </>
                )}

                <button
                    onClick={() => setShowFilter(prev => !prev)}
                    className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                    {showFilter ? 'Close' : 'Filters'}
                </button>

                {/* Category Filter */}
                <div className={showFilter ? '' : 'max-lg:hidden'}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobCategories.map(category => (
                            <li className='flex gap-3 items-center' key={category}>
                                <input className='scale-125' type='checkbox' />
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={showFilter ? '' : 'max-lg:hidden'}>
                    <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobLocations.map(location => (
                            <li className='flex gap-3 items-center' key={location}>
                                <input className='scale-125' type='checkbox' />
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Job Listing */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3'>
                    {jobs.length === 0 ? (
                        <p>No jobs found. Try adjusting your filters.</p>
                    ) : (
                        jobs.map((job, index) => <JobCard key={index} job={job} />)
                    )}
                </div>
            </section>
        </div>
    );
};

export default JobListing;
