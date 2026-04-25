import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
    }

    // 1. Find an active/upcoming batch for this course
    const batch = await prisma.batch.findFirst({
      where: {
        courseId: courseId,
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });

    if (!batch) {
      return NextResponse.json({ error: "No upcoming batches found for this course" }, { status: 404 });
    }

    // 2. Find or create enrollment
    let enrollment = await prisma.enrollment.findUnique({
      where: {
        studentId_batchId: {
          studentId: session.user.id as string,
          batchId: batch.id,
        },
      },
    });

    if (!enrollment) {
      enrollment = await prisma.enrollment.create({
        data: {
          studentId: session.user.id as string,
          batchId: batch.id,
          paymentStatus: "PENDING",
        },
      });
    } else if (enrollment.paymentStatus === "PAID") {
      return NextResponse.json({ error: "You are already enrolled in this course" }, { status: 400 });
    }

    return NextResponse.json({ enrollment });
  } catch (error) {
    console.error("Enrollment creation failed:", error);
    return NextResponse.json(
      { error: "Failed to process enrollment" },
      { status: 500 }
    );
  }
}
