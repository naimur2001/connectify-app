import { useState } from "react";
import { useAuthStore } from "../Components/Strore/useAuthStore";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { login, isLogging } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    login(formData);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 py-10 flex justify-center items-center">
        <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl p-10">
          <h2 className="text-4xl font-bold text-center mb-10 text-black">Login to <span   className="text-4xl font-extrabold tracking-wide text-center bg-gradient-to-r from-pink-300 via-blue-300 to-red-500 bg-clip-text text-transparent " style={{ fontFamily: 'cursive' }}
        >Connectify</span></h2>

          {/* Grid Layout: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="formforlogin bg-black p-8 rounded-2xl shadow-lg w-full">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">Email</label>
                  <input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-white text-sm font-bold mb-2">Password</label>
                  <input
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-3 border  text-white  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 mt-3 flex items-center justify-center h-full text-amber-500 hover:text-amber-700"
                  >
                    {showPassword ? <EyeOffIcon size={25} /> : <EyeIcon size={25} />}
                  </button>
                </div>

                <button
                  className="w-full bg-white text-black p-3 rounded-xl hover:bg-amber-500 transition cursor-pointer"
                  type="submit"
                  disabled={isLogging}
                >
                  {isLogging ? (
                    <span className="loading loading-ring loading-xl"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <div className="flex justify-center mt-4 gap-1">
                <p className="text-white">Don't have an account?</p>
                <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="picforlogin flex justify-center items-center">
              <img
                src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Login pic"
                className="w-full h-[400px] rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
