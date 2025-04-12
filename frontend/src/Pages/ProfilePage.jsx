import { useState } from "react";
import { useAuthStore } from "../Components/Strore/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import Navbar from "../Components/Navbar";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="">
      <Navbar />
      <div className="w-full px-4 py-10 flex justify-center items-center mt-5">
        <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl p-10">
          <h1 className="text-3xl font-semibold text-center text-black mb-8">Profile Information</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-10">
            {/* Avatar upload section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={
                    selectedImg ||
                    authUser.profilePic ||
                    "https://images.pexels.com/photos/2087322/pexels-photo-2087322.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                  alt="Profile"
                  className="size-32 rounded-full object-cover border-4 border-red-100 bg-white"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-0 right-0 
                  bg-black p-2 rounded-full cursor-pointer transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-zinc-600">
                {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
              </p>
            </div>

            {/* Info section */}
            <div className="space-y-6">
              <div className="space-y-1.5 lg:w-80">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-gray-100 rounded-lg border">{authUser?.fullName}</p>
              </div>

              <div className="space-y-1.5 lg:w-80">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-gray-100 rounded-lg border">{authUser?.email}</p>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="flex justify-center mt-10">
            <div className="mt-6 bg-gray-100 rounded-xl p-6 lg:w-96 border-2">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-300">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
