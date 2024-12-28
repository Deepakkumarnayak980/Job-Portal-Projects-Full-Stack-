import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }


    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {

        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocation = (job) =>selectedLocations.length === 0 || selectedLocations.includes(job.location);

        const matchesFilter = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesFilter(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)

    }, [jobs, selectedCategories, selectedLocations, searchFilter])

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
                    onChange={() => setShowFilter(prev => !prev)}
                    className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                    {showFilter ? 'Close' : 'Filters'}
                </button>

                {/* Category Filter */}
                <div className={showFilter ? '' : 'max-lg:hidden'}>
                    <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                    <ul className='space-y-4 text-gray-600'>
                        {JobCategories.map(category => (
                            <li className='flex gap-3 items-center' key={category}>
                                <input
                                    className='scale-125'
                                    type='checkbox'
                                    onChange={() => handleCategoryChange(category)}
                                    checked={selectedCategories.includes(category)}

                                />
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
                                <input
                                    className='scale-125'
                                    type='checkbox'
                                    onChange={() => handleLocationChange(location)}
                                    checked={selectedLocations.includes(location)}

                                />
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
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className="flex items-center justify-center space-x-2 mt-10">
                        {/* Total Pages Calculation */}
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1
                                            ? "bg-blue-100 text-blue-500"
                                            : "text-gray-500"
                                        }`}
                                    aria-label={`Go to page ${index + 1}`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}

                        {/* Next Button */}
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(prev + 1, Math.ceil(filteredJobs.length / 6))
                                )
                            }
                            className="flex items-center justify-center p-2 rounded hover:bg-gray-100"
                            disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                            aria-label="Next Page"
                        >
                            <img src={assets.right_arrow_icon} alt="Next" />
                        </button>
                    </div>
                )}


            </section>
        </div>
    );
};

export default JobListing;
