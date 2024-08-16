import React, { useState } from 'react';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Verify OTP, Step 3: Reset password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log('Sending OTP to', email);
        setStep(2);
    };

    const handleOtpVerification = (e) => {
        e.preventDefault();
        console.log('Verifying OTP:', otp);
        setStep(3);
    };

    const handlePasswordReset = (e) => {
        e.preventDefault();
        console.log('Resetting password to:', newPassword);
        alert('Password has been reset successfully!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit} className="space-y-6">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#54A15D] focus:border-[#54A15D] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54A15D] hover:bg-[#54A15D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54A15D]"
                            >
                                Send OTP
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleOtpVerification} className="space-y-6">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">Verify OTP</h2>
                        <div>
                            <label htmlFor="otp" className="sr-only">OTP</label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                autoComplete="one-time-code"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#54A15D] focus:border-[#54A15D] focus:z-10 sm:text-sm"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  bg-[#54A15D] hover:bg-[#54A15D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54A15D]"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">Set New Password</h2>
                        <div>
                            <label htmlFor="newPassword" className="sr-only">New Password</label>
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#54A15D] focus:border-[#54A15D] focus:z-10 sm:text-sm"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#54A15D] hover:bg-[#54A15D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#54A15D]"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
