import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (!result.name) {
            alert("Please fill in correct details");
        } else {
            localStorage.setItem("user", JSON.stringify(result));
            navigate("/");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Login</h3>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter email"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    value={password}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter Password"
                />
            </div>

            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Login
            </button>
        </div>
    );
};

export default Login;
