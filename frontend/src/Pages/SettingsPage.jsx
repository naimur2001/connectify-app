import Navbar from "../Components/Navbar";
import { useAuthStore } from "../Components/Strore/useAuthStore";
import { Link } from "react-router-dom";

const SettingsPage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className=" min-h-screen">
      <Navbar />

      <div className="w-full px-4 py-10 flex justify-center items-center">
        <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-center mb-10 text-black">Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <img
                src={authUser?.profilePic || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-black object-cover"
              />
              <h3 className="text-2xl font-semibold">{authUser?.fullName || "Username"}</h3>
              <p className="text-gray-600">{authUser?.email || "user@example.com"}</p>
            </div>

            {/* Settings Buttons */}
            <div className="space-y-5 flex flex-col justify-center">
              <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition text-lg">
                Change Profile Picture
              </button>
              <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition text-lg">
                Update Name & Email
              </button>
              <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition text-lg">
                Change Password
              </button>
              <Link
                to="/"
                className="text-blue-500 hover:underline text-center text-base mt-4"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
