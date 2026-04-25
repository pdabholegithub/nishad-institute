"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function CheckoutButton({ 
  enrollmentId, 
  amount, 
  studentName, 
  studentEmail, 
  studentPhone = "9999999999" 
}: { 
  enrollmentId: string, 
  amount: string,
  studentName: string,
  studentEmail: string,
  studentPhone?: string
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create Order
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, enrollmentId }),
      });
      const order = await orderRes.json();

      if (order.error) throw new Error(order.error);

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummykey", 
        amount: order.amount,
        currency: order.currency,
        name: "Nishad IT Solutions",
        description: "Course Enrollment Fee",
        order_id: order.id,
        handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) {
          // 3. Verify Payment
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              enrollmentId,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful! Your enrollment is now active.");
            router.refresh(); // Refresh the page to reflect the PAID status
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: studentName,
          email: studentEmail,
          contact: studentPhone,
        },
        theme: {
          color: "#2563EB", // Primary blue color
        },
      };

      const rzp = new (window as unknown as { Razorpay: new (options: unknown) => { on: (event: string, callback: (res: { error: { description: string } }) => void) => void; open: () => void } }).Razorpay(options);
      rzp.on("payment.failed", function (response: { error: { description: string } }) {
        alert("Payment Failed. Reason: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none bg-emerald-600 text-white hover:bg-emerald-700 h-9 px-4 py-2 shrink-0 shadow-sm"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <CreditCard className="h-4 w-4 mr-2" />
        )}
        Pay ₹{amount} Now
      </button>
    </>
  );
}
