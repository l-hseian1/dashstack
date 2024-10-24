import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
const [isDarkMode, setIsDarkMode] = useState(false);


const toggleTheme = () => {
setIsDarkMode(!isDarkMode);
document.body.classList.toggle('dark');
};



return (
<>

<div className={`bg-none text-white h-screen w-64 fixed top-0 left-0 overflow-y-auto 
    ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
<div className={`px-4 py-6 ml-6 
    ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
    <h2 className="font-bold text-xl mb-2 pl-6">
    <span className="text-blue-500">Dash</span>
    <span className={`text-black
            ${isDarkMode ? 'text-white' : ''}`}>Stack</span>
    </h2>
</div>
<nav className="mt-2 pl-7">
    <div className={`flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors duration-200 text-black  gap-3 
        ${isDarkMode ? 'text-white' : ''}`}>
        <img 
        src="src/assets/img/product.svg" alt="" 
        />
        Products
    </div>
    <div className={`flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors duration-200 text-black  gap-3 
        ${isDarkMode ? 'text-white' : ''}`}>
        <img
        src="src/assets/img/fav.svg" alt="" 
        />
        Favorites
    </div>
    <div className={`flex px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-50 transition-colors duration-200 text-black  gap-3
            ${isDarkMode ? 'text-white' : ''}`}>
        <img 
        src="src/assets/img/order.svg" alt="" 
        />
        Order Lists
    </div>
</nav>
    <Link to="/login">
    <button
    type="submit"
    className="flex gap-3 items-center w-half bg-blue-500 text-white py-2 px-16 rounded-lg hover:bg-4880FF focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-80 ml-6"
    width="158px"
    height="40px"
    >
        <img 
        src="src/assets/img/btn.svg" alt=""
        />
        Logout
    </button>
    </Link>
</div>
<div className={`bg-none mt-2 flex justify-end items-center gap-96 
${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
<div className="pr-4 cursor-pointer" onClick={toggleTheme}>
    <img
    src={`src/assets/img/${isDarkMode ? 'sun_fill.svg' : 'Moon_fill.svg'}`}
    />
</div>
</div>
</>
);
};


export default Sidebar;


