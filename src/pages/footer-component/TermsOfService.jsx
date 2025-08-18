import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <title>Terms of Service | ThinkHub</title>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Last Updated: August 17, 2025
          </p>
        </div>

        <div className="space-y-8 text-left">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing or using our services, you agree to be bound by these
              Terms of Service and our Privacy Policy. If you do not agree to
              these terms, you may not access or use our services. These terms
              apply to all visitors, users, and others who wish to access or use
              the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              2. User Accounts
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When you create an account with us, you guarantee that you are
              above the age of 13 and that the information you provide us is
              accurate, complete, and current at all times. You are responsible
              for safeguarding the password that you use to access the service
              and for any activities or actions under your password. You agree
              not to disclose your password to any third party.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              3. User Conduct and Content
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              You are responsible for your conduct and any data, text, files,
              information, usernames, images, graphics, photos, profiles, audio
              and video clips, sounds, musical works, works of authorship,
              applications, links, and other content or materials (collectively,
              "Content") that you submit, post or display on or via the Service.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                You must not post violent, nude, partially nude, discriminatory,
                unlawful, infringing, hateful, pornographic, or sexually
                suggestive photos or other content via the Service.
              </li>
              <li>
                You must not defame, stalk, bully, abuse, harass, threaten,
                impersonate or intimidate people or entities.
              </li>
              <li>
                You may not use the service for any illegal or unauthorized
                purpose.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              4. Termination
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of the Terms. All provisions
              of the Terms which by their nature should survive termination
              shall survive termination, including, without limitation,
              ownership provisions, warranty disclaimers, indemnity, and
              limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              5. Limitation Of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              In no event shall ThinkHub, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from your access
              to or use of or inability to access or use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Changes to These Terms
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will provide
              at least 30 days' notice prior to any new terms taking effect.
              What constitutes a material change will be determined at our sole
              discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:support@thinkhub.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                support@thinkhub.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
