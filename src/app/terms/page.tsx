import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 font-bold mb-12 text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
          <BookOpen className="h-6 w-6 text-orange-600" />
          <span className="text-xl">Nishad IT Solutions</span>
        </Link>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12 prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
          <p className="text-slate-500 mb-8 font-medium">Last updated: April 25, 2026</p>
          
          <div className="space-y-8 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using Nishad IT Solutions&apos; website, services, or enrolling in our courses, 
                you agree to be bound by these Terms of Service. If you disagree with any part of the terms, 
                then you may not access the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Intellectual Property Rights</h2>
              <p>
                Other than the content you own, under these Terms, Nishad IT Solutions and/or its licensors own all the 
                intellectual property rights and materials contained in this Website and the Courses provided. 
                You are granted limited license only for purposes of viewing the material contained on this Website 
                and participating in the enrolled courses for personal, non-commercial use.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Restrictions</h2>
              <p>You are specifically restricted from all of the following:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Publishing any course material in any other media without prior written consent.</li>
                <li>Selling, sublicensing and/or otherwise commercializing any course material.</li>
                <li>Publicly performing and/or showing any course material.</li>
                <li>Using this Website in any way that is or may be damaging to this Website or the business.</li>
                <li>Using this Website contrary to applicable laws and regulations.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">4. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account 
                on our Service. You are responsible for safeguarding the password that you use to access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">5. Payment and Refunds</h2>
              <p>
                All payments are processed securely via our payment partners (e.g., Razorpay). Course fees are non-refundable 
                once the course has commenced or course materials have been accessed, except as required by applicable law. 
                We reserve the right to change our fees at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">6. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
                whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the 
                Service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Maharashtra, India, without 
                regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms 
                will not be considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. 
                What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">9. Limitation of Liability</h2>
              <p>
                In no event shall Nishad IT Solutions, nor any of its officers, directors, and employees, be held liable for 
                anything arising out of or in any way connected with your use of this Website or our courses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
                <br />
                <strong>Email:</strong> legal@nis.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
