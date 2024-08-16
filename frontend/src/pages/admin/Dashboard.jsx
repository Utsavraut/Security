import React from 'react';
import AdminSidebar from './AdminSidebar';

const Dashboard = () => {
    return (
        <AdminSidebar>
        
        <div className="bg-gray-100 min-h-screen p-4">
            {/* Content container */}
            <div className="container mx-auto px-4">
                {/* Cards Container */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {/* Individual Card */}
                    <div className="bg-white p-4 shadow-lg rounded-lg" style={{ maxWidth: '300px' }}>
                        <h2 className="font-bold text-xl mb-2">Explore Our Blogs</h2>
                        <p className="text-gray-600">Discover a World of Knowledge</p>
                    </div>
                    <div className="bg-white p-4 shadow-lg rounded-lg" style={{ maxWidth: '300px' }}>
                        <h2 className="font-bold text-xl mb-2">Explore Our Blogs</h2>
                        <p className="text-gray-600">Discover a World of Knowledge</p>
                    </div>
                </div>
            </div>
        </div>
      
        </AdminSidebar>
    );
};

export default Dashboard;
