'use client';

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  courseId: string;
  price: string;
  courseTitle: string;
  userEmail: string;
  userName: string;
}

export function CheckoutButton({ courseId, price, courseTitle, userEmail, userName }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Create enrollment first (Server Action or API)
      const enrollRes = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const enrollData = await enrollRes.json();
      if (!enrollRes.ok) throw new Error(enrollData.error || "Enrollment failed");

      const enrollmentId = enrollData.enrollment.id;

      // 2. Create Razorpay Order
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price, enrollmentId }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error("Failed to create order");

      // 3. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Nishad IT Solutions",
        description: `Enrollment for ${courseTitle}`,
        order_id: orderData.id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          // 4. Verify Payment
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              enrollmentId,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push("/student/courses?success=true");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
        },
        theme: {
          color: "#f97316", // Our primary orange
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : "An error occurred during checkout";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="flex w-full justify-center items-center gap-2 rounded-2xl bg-primary px-3 py-5 text-lg font-black text-white shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <>
          <CreditCard className="h-6 w-6" />
          Join Course Now
        </>
      )}
    </button>
  );
}
