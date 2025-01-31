import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.username === "" ||
        Data.email === "" ||
        Data.password === "" ||
        Data.address === ""
      ) {
        toast.error("All fields are required", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      } else {
        const response = await axios.post(
          "https://bookstore-q2ex.onrender.com/api/v1/sign-up",
          Data
        );
        setData({ username: "", email: "", password: "", address: "" });
        toast.success(response.data.message, {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        history("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };
  return (
    <div className=" h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <Toaster />
      <div className="bg-white rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 h-auto ">
        <p className="text-2xl text-center font-bold text-orange-600">SIGN UP</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-black">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-300 text-black p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={Data.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-black">
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-gray-300 text-black p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              required
              value={Data.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-black">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-gray-300 text-black p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={Data.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-black">
              Address
            </label>
            <textarea
              className="w-full mt-2 bg-gray-300 text-black p-2 outline-none"
              rows="5"
              placeholder="address"
              name="address"
              required
              value={Data.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-orange-600 text-white font-semibold py-2 rounded hover:bg-orange-800 transition-all duration-300"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
