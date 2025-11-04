// components/LoadingScreen.jsx
import React, { useEffect, useState } from 'react';
import logo from '../assets/vtlogo.png'; // Ensure you have a logo image at this path

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for natural feel
      });
    }, 200);

    // Minimum display time and completion
    const loadingTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 500); // Match transition time
    }, 7000); // Minimum 7 seconds loading screen

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-green-50 to-emerald-100 flex justify-center items-center z-50 transition-opacity duration-500">
      <div className="text-center max-w-md w-11/12">
        {/* Logo Container */}
        <div className="mb-20">
          <div className="mx-auto mb-4 animate-bounce">
            {/* Replace this with your actual logo */}
            <div className=" flex items-center justify-center ">
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>

        {/* Loading Text
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-green-900 mb-2 tracking-wider">
            VERTE TOWER
          </h2>
          <p className="text-gray-600 text-lg">
            Hydroponic Farming Solutions
          </p>
        </div> */}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-green-700 font-semibold text-sm">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-leaf"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-leaf animation-delay-200"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-leaf animation-delay-400"></div>
        </div>

        {/* Loading Message */}
        <div className="text-gray-500 italic">
          <p>Preparing your farming revolution...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;