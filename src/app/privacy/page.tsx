import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 font-bold mb-12 text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="text-xl">Nishad IT Solutions</span>
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-slate-500 mb-8 font-medium">Last updated: April 25, 2026</p>
          
          <div className="space-y-8 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
              <p>
                Welcome to Nishad IT Solutions. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website 
                and tell you about your privacy rights and how the law protects you.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. The Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Financial Data</strong> includes payment card details (processed securely via Razorpay).</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of courses you have purchased.</li>
                <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing course access).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">4. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. 
                Cookies are files with a small amount of data which may include an anonymous unique identifier. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">5. Third-Party Services</h2>
              <p>
                We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, 
                perform Service-related services or assist us in analyzing how our Service is used. These third parties include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Razorpay:</strong> For secure payment processing.</li>
                <li><strong>OpenAI:</strong> For providing AI-powered chat assistance.</li>
                <li><strong>Prisma/PostgreSQL:</strong> For data storage and management.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">6. Your Legal Rights</h2>
              <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Right to withdraw consent.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">7. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
                used or accessed in an unauthorized way, altered or disclosed.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                <br />
                <strong>Email:</strong> privacy@nishad-it.com
                <br />
                <strong>Address:</strong> Nishad IT Solutions, Pune, Maharashtra, India.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
