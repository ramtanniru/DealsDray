"use client";
import Image from "next/image";
import React, { useRef, useState, useContext } from "react";
import { useRouter } from "next/navigation"; // Correct import
import { AuthContext } from "@/context/AuthContext";

const LoginPage = () => {
  const username = useRef('');
  const password = useRef('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [save, setSave] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter(); // Updated router usage

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = () => {
    const email = username.current.value;
    const pwd = password.current.value;

    setUsernameError(false);
    setPasswordError(false);

    if (!validateEmail(email)) {
      setUsernameError(true);
      return;
    }

    if (pwd === '') {
      setPasswordError(true);
      return;
    }

    if (email === 'admin@example.com' && pwd === 'password') {
      login(router); // router is passed to login
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-row justify-between items-center px-32 bg-[#fff] text-black">
      <div className="flex flex-col justify-center items-start gap-10">
        <h1 className="leading-5">DealsDray</h1>
        <h2 className="text-[28px] font-semibold">India’s first End to End Event Experience App</h2>
        <Image src={"/assets/login.svg"} height={400} width={460} alt="logo" />
      </div>
      <div className="p-10 shadow-xl rounded-md flex flex-col gap-5 items-start justify-center w-1/3 bg-[#fff]">
        <h1 className="text-[30px] font-bold">Get Started</h1>
        <p className="text-[15px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        {/* Email input */}
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <p>Email address</p>
          <input
            placeholder="Enter email address"
            ref={username}
            className="border rounded-md p-2 w-full"
          />
          {usernameError && <p className="text-[#F00] text-[11px]">Please enter a valid email id</p>}
        </div>

        {/* Password input */}
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter password"
            ref={password}
            className="border rounded-md p-2 w-full"
          />
          {passwordError && <p className="text-[#F00] text-[11px]">Incorrect password, try again</p>}
        </div>

        {/* Remember me */}
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-2 items-center justify-start">
            <input type="checkbox" className="rounded-md" onChange={() => setSave(!save)} />
            <label className="text-[14px] text-[#626262]">Remember me</label>
          </div>
          <button className="text-[14px] text-[#626262]">Forgot password?</button>
        </div>

        {/* Login button */}
        <button className="w-full p-2 text-white bg-[#01008A] rounded-md" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
