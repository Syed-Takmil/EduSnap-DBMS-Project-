import React from 'react';

const Page = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form 
                action="/api/checkout_sessions" 
                method="POST"
                className="bg-blue-400 rounded-xl border p-8 flex flex-col justify-center items-center gap-4 shadow-lg text-white"
            >
                <p className="text-lg font-semibold">Do you want to proceed?</p>
                
                <button 
                    type="submit" 
                    className="bg-white text-blue-500 font-bold px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                    Yes, Checkout
                </button>
            </form>
        </div>
    );
};

export default Page;