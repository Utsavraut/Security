import React from 'react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="text-center bg-white py-24"
                style={{
                    backgroundImage: "url('assets/images/home1.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <h1 className="text-4xl font-bold text-white">Welcome to Nepal Traveller</h1>
                <p className="text-md text-black-300 mt-4">Offering you the best quality at the best prices.</p>
                <button className="mt-8 bg-[#54A15D] hover:bg-[#54A15D] text-white font-bold py-2 px-4 rounded-full">
                    Get Started
                </button>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Fast Service</h2>
                        <p className="text-gray-600">Experience quick and efficient service like never before.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Reliable</h2>
                        <p className="text-gray-600">Count on us to provide reliable and consistent quality.</p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">24/7 Support</h2>
                        <p className="text-gray-600">Our support team is here to help you at any time of the day.</p>
                    </div>
                </div>
            </div>



            {/* Call to Action Section */}
            <div className="relative text-center py-24 bg-cover bg-center"
                style={{ backgroundImage: "url('assets/images/sus.png')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay with reduced transparency */}
                <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-white">Ready to Get Started?</h2>
                    <p className="text-white mt-4">Join us today to start your journey!</p>
                    <button className="mt-8 bg-[#54A15D] hover:bg-[#54A15D] text-white font-bold py-2 px-4 rounded-full">
                        Sign Up Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
