import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faUser,  faChevronRight } from '@fortawesome/free-solid-svg-icons';

const blogs = [
    { title: "Summer Holiday To The Oxolotan River", date: "July 15, 2022", author: "Admin", comments: 0, image: "/path/to/image1.jpg" },
    { title: "9 Essential Tips For Making the Most of Your Summer Hol", date: "July 15, 2022", author: "Admin", comments: 0, image: "/path/to/image2.jpg" },
    { title: "5 Ways to Get Your Dream National Geographic", date: "July 15, 2022", author: "Admin", comments: 0, image: "/path/to/image3.jpg" },
    { title: "Top 3 Destinations for Your Next Holiday", date: "July 15, 2022", author: "Admin", comments: 0, image: "/path/to/image4.jpg" },
    { title: "The 11 Best Travel Blogs for Digital Nomads", date: "July 15, 2022", author: "Admin", comments: 0, image: "/path/to/image5.jpg" },
    { title: "Top Travel Hack Ideas for Casual Travellers", date: "July 15, 2022", author: "Admin", comments: 0, image: "/path/to/image6.jpg" }
];

const BlogCard = ({ blog }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
        <div className="p-4">
            
            <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
            <div className="flex items-center text-sm text-gray-600">
                <FontAwesomeIcon icon={faUser} className="text-[#54A15D] mr-2" />
                <span>{`By ${blog.author}`}</span>
                <FontAwesomeIcon icon={faCalendarDay} className="text-[#54A15D] mr-2" />
                <span className="text-sm text-gray-600">{blog.date}</span>
            </div>
        </div>
    </div>
);

const Pagination = () => {
    return (
        <div className="flex justify-center items-center mt-8 space-x-2">
            <button className="w-10 h-10 bg-[#54A15D] text-white rounded-full hover:bg-[#54A15D] focus:outline-none focus:ring-2 focus:ring-[#54A15D] focus:ring-opacity-50">
                1
            </button>
            <button className="w-10 h-10 bg-white text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#54A15D] focus:ring-opacity-50">
                2
            </button>
            <button className="w-10 h-10 bg-[#54A15D] text-white rounded-full hover:bg-[#54A15D] focus:outline-none focus:ring-2 focus:ring-[#54A15D] focus:ring-opacity-50">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
};

const Blogs = () => {
    return (
        <div className="container mx-auto px-14 py-8">
            <div className="bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: 'url(assets/images/blog.png)' }}>
                {/* Header is disabled */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {blogs.map(blog => <BlogCard key={blog.title} blog={blog} />)}
            </div>
            <Pagination />
        </div>
    );
};

export default Blogs;