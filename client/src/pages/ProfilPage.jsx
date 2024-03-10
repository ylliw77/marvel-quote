import { useEffect, useState } from "react";
import axios from "../config/instance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProfilPage() {
  const nav = useNavigate();
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    profilPicture: "",
    address: "",
  });

  async function getUser() {
    try {
      const { data } = await axios({
        method: "get",
        url: "/profile",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setUserInput({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        profilPicture: data.profilPicture,
        address: data.address,
      });
    } catch (err) {
      console.log(err.response.data.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "PUT",
        url: "/profile",
        data: userInput,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Update!",
            text: "Your Profl has been updated.",
            icon: "success",
          });
        }
      });
      nav("/profile");
    } catch (err) {
        Swal.fire(err.response.data.message, "???", "error");
    }
  }

  async function handleChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function deleteAccount(e) {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "delete",
        url: "/acc-delete",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      Swal.fire("Success to delete account");
    } catch (err) {
        Swal.fire(err.response.data.message, "???", "error");
    }
  }

  async function updateprofilPic(e) {
    e.preventDefault()
    nav('/upload')
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={userInput.profilPicture}
          alt="Profile picture"
        />

        <p className="text-center text-gray-600 mt-1">Software Engineer</p>
        <form onSubmit={handleUpdate}>
          <div className="mt-5 text-center">
            <label className="font-bold p-3"> Full Name</label> <br />
            <input
              className="text-black mt-2 text-center"
              value={userInput.fullName}
              name="fullName"
              onChange={handleChange}
            />{" "}
            <br />
            <label className="font-bold p-3"> Email</label> <br />
            <input
              disabled
              className="text-black mt-2 text-center"
              value={userInput.email}
              name="email"
            />{" "}
            <br />
            <label className="font-bold p-3"> Phone Number</label> <br />
            <input
              className="text-black mt-2 text-center"
              value={userInput.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />{" "}
            <br />
            <label className="font-bold p-3"> Address</label> <br />
            <input
              className="text-black mt-2 text-center"
              value={userInput.address}
              onChange={handleChange}
              name="address"
            />{" "}
            <br />
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="button submit"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
            >
              Update Profil
            </button>
            <button
              type="button"
              onClick={deleteAccount}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
            >
              Delete Account
            </button>
            <button
              type="button"
              onClick={updateprofilPic}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 "
            >
              Update Profil Pic
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
