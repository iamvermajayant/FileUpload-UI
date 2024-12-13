
// Pricing.js
import React from 'react';

function Pricing() {
  return (
    <section id="pricing" className="px-8 py-10">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Pricing</h2>
        <p className="text-lg text-black-600 dark:text-black-300">
          Choose the plan that fits your needs. All plans are open-source and free to use.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold">Basic</h3>
            <p className="text-lg font-bold text-gray-600 dark:text-gray-300">$0</p>
            <p className="text-gray-600 dark:text-gray-300">Basic features for small projects.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="text-lg font-bold text-gray-600 dark:text-gray-300">$49</p>
            <p className="text-gray-600 dark:text-gray-300">Advanced features for growing startups.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-8 text-center space-y-4">
            <h3 className="text-xl font-semibold">Enterprise</h3>
            <p className="text-lg font-bold text-gray-600 dark:text-gray-300">$199</p>
            <p className="text-gray-600 dark:text-gray-300">All features, support, and custom options.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
