import { useNavigate } from "react-router-dom";
import axios from "../config/instance";
import Swal from "sweetalert2";
import { useState } from "react";

export default function UploadPage() {
  const nav = useNavigate();
  const [upload, fileToUplad] = useState(null);

  function handleOnChange(e) {
    fileToUplad(e.target.files[0]);
  }

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgUrl", upload);
    try {
      const { data } = await axios({
        method: "PATCH",
        url: `/profile`,
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Success Update your profile",
        showConfirmButton: false,
        timer: 1500
      });
      nav("/profile");

    } catch (err) {
      Swal.fire(err.response.data.message, "???", "error");
    }
  }
  return (
    <>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleOnChange} />

        <input type="submit" value="Upload File" />

      </form>
    </>
  );
}
