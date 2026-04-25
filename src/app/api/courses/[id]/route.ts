import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/courses/[id]
// Test fetching a specific single resource
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: params.id }
    });

    if (!course) {
      return NextResponse.json({
        success: false,
        error: "Not Found",
        message: `Course with ID ${params.id} does not exist.`
      }, { status: 404 }); // 404 assertion test
    }

    return NextResponse.json({
      success: true,
      data: course
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT /api/courses/[id]
// Test Full Resource Update
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Verify exists first
    const existing = await prisma.course.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Not Found" }, { status: 404 });
    }

    const updatedCourse = await prisma.course.update({
      where: { id: params.id },
      data: {
        title: body.title ?? existing.title,
        price: body.price ? body.price.toString() : existing.price,
        level: body.level ?? existing.level,
      }
    });

    return NextResponse.json({
      success: true,
      message: "Resource updated successfully",
      data: updatedCourse
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE /api/courses/[id]
// Test Resource Deletion
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // We wrap in a try-catch to handle the case where it doesn't exist
    const deletedCourse = await prisma.course.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: `Course ${params.id} successfully deleted.`
    }, { status: 200 });

  } catch (error: any) {
    // Prisma throws an error if record to delete does not exist
    return NextResponse.json({
      success: false,
      error: "Not Found",
      message: "Cannot delete. Record does not exist."
    }, { status: 404 });
  }
}
