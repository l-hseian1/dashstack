import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [profileImage, setProfileImage] = useState("");
const navigate = useNavigate();
const [token, setToken] = useState();
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("user_name", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password_confirmation", confirmPassword);
  formData.append("profile_image", profileImage);
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  console.log("mmmmm", formData.values());
  const response = await axios
    .post("https://vica.website/api/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log(response);
      setToken(response.data.data.token); 
      localStorage.setItem("token", response.data.data.token);
      const f = localStorage.getItem("token");
      console.log("f", f);
      navigate("/Product");
    })
    .catch(function (error) {
      console.log(error);
    });
};

return (
  <div className="flex justify-center h-screen bg-custom-bg bg-cover bg-centers">
    <div
      className="bg-white rounded-lg shadow-lg p-8 mt-12 mb-12"
      radius="50px"
      width="750px"
      height="551px"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create An Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-8">
          <div className="mb-4">
            <p>First Name:</p>
            <input
              type="text"
              placeholder=" First Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <p>Last Name:</p>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <p>User Name:</p>
            <input
              type="text"
              placeholder="User Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <p>Email</p>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <div className="mb-4">
            <p>Password:</p>
            <input
              type="password"
              placeholder="*******"
              className="w-full px-16 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <p>Confirmation Password:</p>
            <input
              type="password"
              placeholder="*******"
              className="w-full px-16 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <input
            type="file"
            className="hidden"
            id="profile-image"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <label
            htmlFor="profile-image"
            className="block text-gray-700 font-medium mb-2 cursor-pointer"
          >
            Profile Image:
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                width="100"
                height="100"
              />
            ) : (
              <img
                src="src/assets/img/profile-avatar.png"
                width="100"
                height="100"
              />
            )}
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-half bg-blue-500 text-white py-2 px-16 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            width="300px"
            height="75px"
          >
            Create Account
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <span>Already have an account? </span>
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
    <ToastContainer />
  </div>
);
};

export default RegisterPage;
