import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <title>Privacy Policy | ThinkHub</title>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: August 17, 2025
          </p>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p>
              Welcome to ThinkHub ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect information about you in a variety of ways. The information we may collect on the platform includes:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and profile picture, that you voluntarily give to us when you register with the platform.
              </li>
              <li>
                <strong>Usage Data:</strong> Information your browser sends whenever you visit our platform. This may include your computer's IP address, browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.
              </li>
              <li>
                <strong>User Content:</strong> Information you provide for us to post on the platform, such as posts, comments, and other user-generated content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 mt-3">
              <li>Create and manage your account.</li>
              <li>Personalize your experience on the platform.</li>
              <li>Monitor and analyze usage and trends to improve your experience.</li>
              <li>Respond to your comments, questions, and provide user support.</li>
              <li>Protect against unauthorized access to our systems and prevent fraud.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Disclosure of Your Information
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Security of Your Information
            </h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Your Data Protection Rights
            </h2>
            <p>
              You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update, or request deletion of your Personal Data directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <a href="mailto:support@thinkhub.com" className="text-blue-600 dark:text-blue-500 hover:underline ml-2">
                support@thinkhub.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;