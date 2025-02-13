"use client";

export function AuthPage({isSignin}:{
    isSignin:boolean
}) {
    return (
        <div className="min-h-screen w-full bg-black flex justify-center items-center px-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isSignin ? "Welcome Back" : "Create Account"}
                </h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all"
                    />
                    <button 
                        className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {isSignin ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
}