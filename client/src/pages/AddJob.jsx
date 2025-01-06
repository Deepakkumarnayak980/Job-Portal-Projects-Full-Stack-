import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import "quill/dist/quill.snow.css";

const AddJob = () => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("Bangalore");
    const [category, setCategory] = useState("programming");
    const [level, setLevel] = useState("Beginner level");
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Write the job description here...",
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobData = {
            title,
            location,
            category,
            level,
            salary,
            description: quillRef.current.root.innerHTML,
        };
        console.log("Job Data:", jobData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-md space-y-6"
        >
            {/* Job Title */}
            <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Job Title
                </label>
                <input
                    type="text"
                    placeholder="Type here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Job Description */}
            <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Job Description
                </label>
                <div
                    ref={editorRef}
                    className="min-h-[200px] border rounded-md bg-gray-50 p-3 focus:ring-blue-500 focus:border-blue-500"
                ></div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Job Category */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Job Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {JobCategories.map((category, index) => (
                            <option key={`${category}-${index}`} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Job Location */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Job Location
                    </label>
                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >

                        {JobLocations.map((location, index) => (
                            <option key={`${location}-${index}`} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Job Level */}
                <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                        Job Level
                    </label>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Beginner level">Beginner level</option>
                        <option value="Intermediate level">Intermediate level</option>
                        <option value="Senior level">Senior level</option>
                    </select>
                </div>
            </div>

            {/* Job Salary */}
            <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Job Salary
                </label>
                <input
                    type="number"
                    placeholder="25000"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
                Add Job
            </button>
        </form>
    );
};

export default AddJob;
