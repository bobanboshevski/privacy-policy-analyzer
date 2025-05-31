import React from "react";

const BackgroundElements = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => (
  <>
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 left-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>

    {/* Interactive Cursor Effect */}
    <div 
      className="fixed w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full pointer-events-none z-50 mix-blend-difference opacity-75"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transition: 'all 0.1s ease-out'
      }}
    />
  </>
);

export default BackgroundElements;