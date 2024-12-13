import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 检查 localStorage 中是否存在 token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // 清除 token 并更新状态
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/products');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 左侧 Logo 和主导航 */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">Logo</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                >
                  About
                </Link>
                {/* 添加更多导航链接 */}
              </div>
            </div>
          </div>

          {/* 右侧认证按钮 */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
                <LikeButton disabled={!isLoggedIn} />
            )}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;