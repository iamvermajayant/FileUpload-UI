// Hero.js
import React from 'react';
function Hero({ handleGetStartedClick }) {
  return (
    <section className="flex flex-col h-screen md:flex-row items-center justify-between px-8 py-20">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
        Simplify Your File Management Process
        </h1>
        <p className="text-lg font-light">
        Organize, store, and share your files effortlessly with our streamlined file management system.
        Built with Next.js & TailwindCSS, it's secure, efficient, and user-friendly.
        </p>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img
          src="https://i.postimg.cc/pX5LQWhm/image-removebg-preview-1.png"
          alt="Illustration"
          className="w-full"
        />
      </div>
    </section>
  );
}

export default Hero;
