import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiAuth from "../../../../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Basic password validation
    if (!password) {
      setError("Please enter your password");
      return;
    }

    apiAuth
      .post("api/auth/register", { email, password })
      .then(({ data }) => {
        console.log(data);
        localStorage.removeItem("email", data.email);
        localStorage.setItem("email", data.email);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password");
      });

    // Clear form fields and error message
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="flex flex-col border-[#cecccc] border-2 rounded-xl p-5 w-[400px]">
        <h2 className="text-[#f9f9f9] text-[32px] font-bold mb-6 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-start w-full">
            <label className="text-[#f9f9f9] mb-3 font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="h-10 outline-none rounded-md indent-3 bg-[#353434] text-[#f9f9f9] border-[#cecccc] border-2 pr-3"
              placeholder="Enter email..."
            />
          </div>
          <div className="flex flex-col justify-start w-full mt-4">
            <label className="text-[#f9f9f9] mb-3 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="h-10 outline-none rounded-md indent-3 bg-[#353434] text-[#f9f9f9] border-[#cecccc] border-2 pr-3"
              placeholder="Enter password..."
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#6a91d4] rounded-lg text-[#f9f9f9] px-3 py-2 font-bold mt-6"
            >
              Sign up
            </button>
          </div>
        </form>
        {error && (
          <p className="text-red-600 font-bold text-[16px] text-center mt-3">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
