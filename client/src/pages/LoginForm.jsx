import { useEffect, useState } from "react";
import axios from "../config/instance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginForm() {
  const nav = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "POST",
        url: "/login",
        data: userInput,
      });
      localStorage.setItem("access_token", data.access_token);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success Login",
        showConfirmButton: false,
        timer: 1500
      });
      nav("/");
    } catch (err) {
      Swal.fire(err.response.data.message, "???", "error");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  async function handleCredentialResponse({ credential }) {
    try {
      console.log(credential, "ini tanda credne");
      const { data } = await axios({
        method: "POST",
        url: "/google-auth",
        headers: {
          ["google-token"]: credential,
        },
      });
      console.log(data, "this is data");
      localStorage.setItem("access_token", data.access_token);
      nav("/");
    } catch (err) {
      console.log(err, "this is err");
      // Swal.fire(err.response.data.message, "???", "error");
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1035681550548-m96t0v7hac5u24f5iat2t3u4agvlksfl.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm p-4 bg-neutral-800 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-red-500">
              Sign in to our platform
            </h5>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@mail.com"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-red-500 bg-white hover:bg-black-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to your account
            </button>
            <div onSubmit={handleCredentialResponse} id="buttonDiv"></div>
          </form>
        </div>
      </div>
    </>
  );
}
