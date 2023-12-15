import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [percent, setPercent] = useState(0);
  const [fileUploadError, setUploadError] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({ id: currentUser._id });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    try {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercent(Math.round(progress));
        },

        (error) => {
          setUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({ ...formData, avatar: downloadUrl });
            console.log("uurl", downloadUrl);
          });
        }
      );
    } catch (err) {}
  };

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/updateUserDetails/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUserUpdateSuccess(true);

      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/deleteUserDetails/${currentUser._id}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          id="avatar"
        />
        <img
          className="rounded-full h-36 w-36 object-cover cursor-pointer self-center"
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          onChange={handleOnchange}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : percent > 0 && percent < 100 ? (
            <span className="text-slate-700">{`Uploading ${percent}%`}</span>
          ) : percent === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="User name"
          defaultValue={currentUser.username}
          className="border p-3 focus:outline-none rounded-lg"
          id="username"
          onChange={handleOnchange}
        ></input>
        <input
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="border p-3 focus:outline-none rounded-lg"
          id="email"
          onChange={handleOnchange}
        ></input>
        <input
          type="password"
          onChange={handleOnchange}
          placeholder="Password"
          defaultValue="*******"
          className="border focus:outline-none p-3 rounded-lg"
          id="password"
        ></input>
        <button
          disabled={loading}
          className="bg-lime-500 p-3 rounded-2xl uppercase text-black font-semibold hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Loading" : "Update"}
        </button>
      </form>

      <div className="mt-4 justify-between flex">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 hover:font-extrabold"
        >
          {" "}
          Delete Account
        </span>
        <span className="text-red-700 hover:font-extrabold"> Sign out</span>
      </div>

      <p className="text-red-600 font-extrabold text-center mt-5">
        {error ? error : ""}
      </p>
      <p className="text-green-500 font-extrabold text-center mt-5">
        {userUpdateSuccess ? "User details updated Successfully" : ""}
      </p>
    </div>
  );
}
