import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };

    return (
        <div className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/">
                    <img 
                        className="h-8 md:h-10 " 
                        src={logo} 
                        alt="logo" 
                    />
                </Link>
                <div className="hidden md:flex items-center space-x-4">
                    {auth ? (
                        <>
                            <Link to="/" className="text-white hover:underline">Products</Link>
                            <Link to="/add" className="text-white hover:underline">Add Product</Link>
                            <Link to="/profile" className="text-white hover:underline">Profile</Link>
                            <button 
                                onClick={logout} 
                                className="text-white hover:underline"
                            >
                                Logout ({JSON.parse(auth).name})
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="text-white hover:underline">Sign Up</Link>
                            <Link to="/login" className="text-white hover:underline">Login</Link>
                        </>
                    )}
                </div>
                <button id="menu-button" className="md:hidden text-white focus:outline-none">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            <div id="mobile-menu" className="md:hidden mt-4">
                {auth ? (
                    <ul className="space-y-4 text-white text-center">
                        <li>
                            <Link to="/" className="block hover:underline">Products</Link>
                        </li>
                        <li>
                            <Link to="/add" className="block hover:underline">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/profile" className="block hover:underline">Profile</Link>
                        </li>
                        <li>
                            <button 
                                onClick={logout} 
                                className="block hover:underline"
                            >
                                Logout ({JSON.parse(auth).name})
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="space-y-4 text-white text-center">
                        <li>
                            <Link to="/signup" className="block hover:underline">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login" className="block hover:underline">Login</Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Nav;
