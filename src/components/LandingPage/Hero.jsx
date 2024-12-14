// Hero.js
import React from 'react';

function Hero({ handleGetStartedClick }) {
  return (
    <section className="flex min-h-screen transition-colors duration-300">
      {/* Left Side: Text Content */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Simplify Your File Management Process
          </h2>
          <p className="text-lg mb-6 text-gray-500 dark:text-gray-400">
            Organize, store, and share your files effortlessly with our streamlined file management system.
            Built with Next.js & TailwindCSS, it's secure, efficient, and user-friendly.
          </p>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center p-8">
        <img
          src="https://i.postimg.cc/BZ87cbs9/image-removebg-preview-3-1.png"
          alt="Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </section>
  );
}

export default Hero;
