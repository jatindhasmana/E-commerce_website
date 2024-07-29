import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const SignUP = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:3000/register", {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6">Register</h3>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          required
        />
        <div className="text-green-500 text-sm mt-1">Perfect</div>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          type="email"
        />
        <div className="text-red-500 text-sm mt-1">This field can't be empty</div>
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          placeholder="Use a strong password"
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          required
        />
        <div className="text-red-500 text-sm mt-1">This field can't be empty</div>
      </div>

      <button
        onClick={collectData}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUP;
