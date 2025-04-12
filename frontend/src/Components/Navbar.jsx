import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Components/Strore/useAuthStore';
import { LogOut, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { logout,authUser } = useAuthStore();

const handleLogout= async()=>{
try {
  await logout()
} catch (error) {
  console.error("Logout failed", error);
}
}

  return (
    <nav className="bg-white text-black p-4 flex justify-between items-center shadow-md w-full lg:w-7xl mx-auto mb-1 rounded-3xl px-6  md:px-10 lg:px-16">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold italic" style={{ fontFamily: 'cursive' }}>
        Connectify
      </Link>
      
      {/* Navigation Links */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/profile" className="flex items-center gap-2 hover:text-gray-400 transition">
          <User size={20} />
          <span className="hidden sm:inline">{!authUser ? "Profile" : authUser.fullName}</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-2 hover:text-gray-400 transition">
          <Settings size={20} />
          <span className="hidden sm:inline">Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-lg hover:bg-cyan-300 transition"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
