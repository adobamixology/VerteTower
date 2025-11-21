// components/LoadingScreen.jsx
import React, { useEffect, useState } from 'react';

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
    <div className="fixed inset-0 w-full h-full bg-white/70 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-500">
      <div className="text-center max-w-md w-11/12 bg-white/80 shadow-xl rounded-2xl px-8 py-10 border border-emerald-100">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-500 mb-2">
            Verte Tower
          </p>
          <h2 className="text-2xl font-semibold text-gray-900">
            Initializing dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            We are syncing telemetry and preparing your personalized view.
          </p>
        </div>

        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"
            style={{ animationDuration: '1.4s' }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-800">
              {Math.min(100, Math.round(progress))}%
            </span>
          </div>
        </div>

        <div className="mb-8">
          <div className="w-full bg-emerald-50 rounded-full h-2 mb-2 relative overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-emerald-600 font-medium text-sm">
              Syncing data sources
            </span>
          </div>
        </div>

        <div className="space-y-1 text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Authenticating devices
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse animation-delay-200"></span>
            Calibrating sensors
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse animation-delay-400"></span>
            Preparing insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;