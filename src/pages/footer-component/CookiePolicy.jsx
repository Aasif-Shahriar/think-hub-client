import React from "react";
import { Link } from "react-router"; // Assuming you are using React Router for navigation

const CookiePolicy = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <title>Cookie Policy | ThinkHub</title>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: August 19, 2025
          </p>
        </div>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies help us to remember your preferences and improve your overall experience on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. How We Use Cookies
            </h2>
            <p className="mb-3">
              We use cookies for several reasons, which are detailed below. Unfortunately, in most cases, there are no industry-standard options for disabling cookies without completely disabling the functionality and features they add to this site.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Account-Related Cookies:</strong> If you create an account with us, we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out.
              </li>
              <li>
                <strong>Login-Related Cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.
              </li>
              <li>
                <strong>Site Preferences Cookies:</strong> To provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it (e.g., theme settings). We use cookies to remember your preferences.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> We use analytics cookies to track how our platform is used so that we can make improvements. These cookies may track things such as how long you spend on the site and the pages that you visit.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. Your Choices Regarding Cookies
            </h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
            <p className="mt-3">
              As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. More Information
            </h2>
            <p>
              Hopefully, that has clarified things for you. If you are still looking for more information, then you can contact us through our preferred contact methods. For more details on how we handle your data, please read our{" "}
              <Link to="/privacy-policy" className="text-blue-600 dark:text-blue-500 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
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

export default CookiePolicy;