import React from 'react';

const LoginScreen = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-8">
      {/* Branding */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black italic text-orange-500 tracking-tighter shadow-orange-500/20">
          Clintzy
        </h1>
        <p className="text-zinc-500 mt-2 text-sm uppercase tracking-widest">Premium Messaging</p>
      </div>

      {/* Login Card */}
      <div className="w-full bg-zinc-900/50 p-8 rounded-[32px] border border-zinc-800 backdrop-blur-xl">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Username or Phone" 
            className="w-full bg-black/50 border border-zinc-700 p-4 rounded-2xl text-white focus:border-orange-500 outline-none transition-all"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-black/50 border border-zinc-700 p-4 rounded-2xl text-white focus:border-orange-500 outline-none transition-all"
          />
        </div>

        <button className="w-full bg-orange-500 mt-8 p-4 rounded-2xl text-white font-black text-lg shadow-[0_10px_20px_rgba(245,124,0,0.3)] active:scale-95 transition-transform">
          Enter Clintzy
        </button>

        <div className="mt-6 text-center">
          <p className="text-zinc-500 text-sm">
            Don't have an account? <span className="text-orange-500 font-bold">Sign Up</span>
          </p>
        </div>
      </div>

      <p className="absolute bottom-10 text-zinc-600 text-[10px] tracking-widest">
        SECURE END-TO-END ENCRYPTED
      </p>
    </div>
  );
};

export default LoginScreen;
