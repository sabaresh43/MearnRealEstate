import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [percent, setPercent] = useState(0);
  const [fileUploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
  console.log(fileUploadError);
  console.log(percent);

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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>{
            setFormData({ ...formData, avatar: downloadUrl })
            console.log('uurl',downloadUrl)
          }
           
          );
        }
      );
    } catch (err) {}
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>

      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          className="rounded-full h-36 w-36 object-cover cursor-pointer self-center"
          onClick={() => fileRef.current.click()}
          src={ formData.avatar || currentUser.avatar}
          alt="profile"
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
          className="border p-3 focus:outline-none rounded-lg"
          id="name"
        ></input>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 focus:outline-none rounded-lg"
          id="email"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="border focus:outline-none p-3 rounded-lg"
          id="password"
        ></input>
        <button className="bg-lime-500 p-3 rounded-2xl uppercase text-black font-semibold hover:opacity-90 disabled:opacity-80">
          Update
        </button>
      </form>

      <div className="mt-4 justify-between flex">
        <span className="text-red-700 hover:font-extrabold">
          {" "}
          Delete Account
        </span>
        <span className="text-red-700 hover:font-extrabold"> Sign out</span>
      </div>
    </div>
  );
}
