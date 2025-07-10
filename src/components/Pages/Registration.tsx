import React from "react";
import signupimg from "../../assets/Info_signup.jpg";
import logo from "../../assets/ijlogo.jpg"; // Ensure you have the logo image imported
import { Link } from "react-router-dom";
import RegisterModal from "../smallcomponents/registermodal";
import { useState } from "react";

function Register() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      setModalOpen(true);
      document.getElementById('my_modal_3').showModal();
    };
  return (
    <section className="min-h-screen flex items-center justify-center p-4 overflow-x-hidden text-lg">
      <div className="relative flex flex-col md:flex-row w-full max-w-6xl h-auto md:h-[95vh] bg-white rounded-lg shadow-2xl overflow-hidden overflow-y-auto">
        {/* Left side container for logo and image */}
        <div className="w-full md:w-1/2 flex flex-col items-left justify-center p-2">
          {/* Logo */}
          <div className="mb-4 pt-2">
            <img
              src={logo}
              className="h-20 w-auto"
              alt="Logo"
            />
          </div>

          {/* Signup Image */}
          <div className="relative w-full h-64 md:h-auto">
            <img
              src={signupimg}
              className="w-full h-full object-cover"
              alt="Signup"
            />
          </div>
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-4 md:p-10 md:pt-44">
          <form className="text-xl">
            {/* Sign up section */}
            <div className="flex items-center justify-center mb-4">
              <p className="text-xl mr-4">Sign up with</p>

              {/* Social Media Buttons */}
              <button
                type="button"
                className="mx-1 h-9 w-9 rounded-full bg-blue-600 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>

              <button
                type="button"
                className="mx-1 h-9 w-9 rounded-full bg-blue-600 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>

              <button
                type="button"
                className="mx-1 h-9 w-9 rounded-full bg-blue-600 text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none active:bg-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </button>
            </div>

            {/* Separator */}
            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold">Or</p>
            </div>

            {/* Full Name input */}
            <div className="relative mb-6">
              <input
                type="text"
                id="fullname"
                className="peer block w-full appearance-none rounded border border-gray-300 bg-transparent px-3 py-2 leading-6 outline-none transition duration-200 ease-linear focus:border-blue-600 focus:text-neutral-700 focus:outline-none"
                placeholder=""
              />
              <label
                htmlFor="fullname"
                className="absolute left-3 -top-2.5 bg-white px-1 text-neutral-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-neutral-500 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-blue-600"
              >
                Full Name
              </label>

            </div>

            {/* Phone */}
            <div className="relative mb-6">
              <input
                type="phone"
                id="phone"
                className="peer block w-full appearance-none rounded border border-gray-300 bg-transparent px-3 py-2 leading-6 outline-none transition duration-200 ease-linear focus:border-blue-600 focus:text-neutral-700 focus:outline-none"
                placeholder=""
              />
              <label
                htmlFor="phone"
                className="absolute left-3 -top-2.5 bg-white px-1 text-neutral-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-neutral-500 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-blue-600"
              >
                Phone
              </label>
            </div>

            {/* Email input */}
            <div className="relative mb-6">
              <input
                type="email"
                id="email"
                className="peer block w-full appearance-none rounded border border-gray-300 bg-transparent px-3 py-2 leading-6 outline-none transition duration-200 ease-linear focus:border-blue-600 focus:text-neutral-700 focus:outline-none"
                placeholder=""
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 bg-white px-1 text-neutral-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-neutral-500 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-blue-600"
              >
                Email address
              </label>
            </div>

            {/* Password input */}
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                className="peer block w-full appearance-none rounded border border-gray-300 bg-transparent px-3 py-2 leading-6 outline-none transition duration-200 ease-linear focus:border-blue-600 focus:text-neutral-700 focus:outline-none"
                placeholder=""
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2.5 bg-white px-1 text-neutral-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-neutral-500 peer-focus:-top-2.5 peer-focus:bg-white peer-focus:text-blue-600"
              >
                Password
              </label>
            </div>

            {/* Sign Up Button and Login Link */}
            <div className="flex items-center justify-between mt-6">
            <button
                type="button"
                onClick={openModal}
                className="inline-block rounded bg-blue-600 px-7 py-3 text-xl font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            >
                Register
            </button>

            <p className="text-xl">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 hover:underline">
                Login
                </Link>
            </p>
            </div>
          </form>
        </div>
      </div>
      <RegisterModal />
    </section>
  );
}

export default Register;