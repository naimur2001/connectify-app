import {create} from "zustand"
import {axiosInstance} from "../../lib/axios"
import toast from 'react-hot-toast';
import { io, Socket } from "socket.io-client";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
const BASE_URL ="http://localhost:5000/api" 

export const useAuthStore= create ((set,get)=>({
 authUser:null,
isSigningup:false,
isLogging:false,
isUpdatingProfile:false,
isCheckingAuth:true,
onlineUsers:[],
socket:null,

 checkAuth:async()=>{
  try {
  const res=await axiosInstance.get("/auth/check")
  set({authUser:res.data})
  } catch (error) {
    set({authUser:null})
    toast.error(error.response.data.message)
  }finally{
    set({isCheckingAuth:false})

  }
 },

 signup: async (data) => {
  set({ isSigningup: true });

  try {
    const res = await axiosInstance.post("/auth/signup", data);
    set({ authUser: res.data });
    toast.success("Account created successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
  } finally {
    set({ isSigningup: false });
  }
},

login: async (data)=> {
  set({isLogging:true});
  try {
    const res = await axiosInstance.post("/auth/login", data);
    set({ authUser: res.data });
    toast.success("Login successfully");
    get().connectSocket()
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }finally{
    set({isLogging:false})
  }
},

logout: async (data)=>{
try {
  const res = await axiosInstance.post("/auth/logout", data);
  set({authUser:null})
  toast.success("Logout succesfully")
  get().disconnectSocket()
} catch (error) {
  toast.error(error.response?.data?.message || "Logout failed");
}
},
updateProfile: async (data) => {
  set({ isUpdatingProfile: true });
  try {
    const res = await axiosInstance.put("/auth/update-profile", data, {
      withCredentials: true,  // Ensure credentials (cookies) are sent with the request
    });
    set({ authUser: res.data });
    toast.success("Uploaded successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Profile update failed");
  } finally {
    set({ isUpdatingProfile: false });
  }
},

connectSocket: async ()=>{
  const {authUser}=get()

if (!authUser ||  get().socket?.connected) return

  const socket=io(Base_Url,{
    query:{
      userId:authUser._id
    },
  })
  socket.connect()
  set({Socket:socket})
  socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds });
  });
},

disconnectSocket: async ()=>{
  if (get().socket?.connected) {
    get().socket.disconnect()
  }
},


}))