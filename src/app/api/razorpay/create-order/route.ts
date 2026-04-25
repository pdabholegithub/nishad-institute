import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, enrollmentId } = await req.json();

    if (!amount || !enrollmentId) {
      return NextResponse.json({ error: "Amount and enrollmentId are required" }, { status: 400 });
    }

    // Amount in paise (1 INR = 100 paise)
    const options = {
      amount: parseInt(amount) * 100, 
      currency: "INR",
      receipt: `receipt_enr_${enrollmentId}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
