// components/LoadingScreen.jsx
import React, { useEffect, useState } from 'react';
import logo from '../assets/vtfavicon.png'; // adjust if path differs

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    // After 7 seconds, fade out then hide
    const loadingTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete();
      }, 300); // fade-out duration
    }, 7000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center text-white z-50 transition-opacity duration-500 
        ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: "#15803d" }}
    >
      <div className="flex flex-col items-center animate-slideUp">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-24 mb-6 animate-pulse"
        />

        {/* Progress Text */}
        <p className="mt-2 text-lg font-medium">
          Loading... {Math.min(100, Math.round(progress))}%
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
