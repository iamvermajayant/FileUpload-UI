// Hero.js
import React from 'react';

function Hero({ handleGetStartedClick }) {
  return (
    <section className="flex flex-col h-screen md:flex-row items-center justify-between px-8 py-20">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Free Landing Page Template for Startups
        </h1>
        <p className="text-lg font-light">
          Nextly is a free landing page & marketing website template for startups and indie projects.
          It's built with Next.js & TailwindCSS. And it's completely open-source.
        </p>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img
          src="https://cdn.prod.website-files.com/62d94a65a0e0d836f595e9bc/650c8e09404e9355f8062f88_What-is-a-file-management-system.jpg"
          alt="Illustration"
          className="w-full"
        />
      </div>
    </section>
  );
}

export default Hero;
