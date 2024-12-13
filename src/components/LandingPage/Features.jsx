// Features.js
import React from 'react';

function Features() {
  return (
    <section id="features" className="px-8 py-20">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Features</h2>
        <p className="text-lg text-black-600 dark:text-black-300">
          Nextly offers a sleek and modern design that is fully customizable for your project needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Responsive Design</h3>
              <p className="text-gray-600 dark:text-gray-300">Looks great on all screen sizes.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Fast Performance</h3>
              <p className="text-gray-600 dark:text-gray-300">Optimized for speed and performance.</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Easy Customization</h3>
              <p className="text-gray-600 dark:text-gray-300">TailwindCSS makes it simple to adjust.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
