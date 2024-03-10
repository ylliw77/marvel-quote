import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../config/instance";

export default function Navbar() {
  const nav = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Bye-bye",
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.clear();
    nav("/login");
  }

  function goToProfile(e) {
    e.preventDefault();

    nav("/profile");
  }

  async function handleClick() {
    try {
      const { data } = await axios({
        method: "POST",
        url: "/midtrans/user/payment",
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      // console.log(data);
      window.snap.pay(data.transactionToken, {
        onSuccess: async function (result) {
          await axios({
            method: "PATCH",
            url: "/user/upgrade",
            headers: {
              Authorization: "Bearer " + localStorage.access_token,
            },
          });
          Swal.fire(
            "Payment success!",
            "Your Account Successfully Updated",
            "success"
          );
        },
      });
    } catch (err) {
      Swal.fire("Error", "Payment Failed", "warning");
    }
  }
  return (
    <>
      <div className="flex justify-around px-3 pt-4  bg-black">
        <div>
          <button
            onClick={goToProfile}
            className="text-red-500 text-xl font-bold"
          >
            Profil
          </button>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault(), nav("/");
          }}
          className="text-3xl text-center font-bold text-red-500"
        >
          MARPEL KUWOT
        </button>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault(), handleClick();
            }}
            className="text-xl px-3 font-bold text-red-500"
          >
            Upgrade
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 text-sm font-bold"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
}
