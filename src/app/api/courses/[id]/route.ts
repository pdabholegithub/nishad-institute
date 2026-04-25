import prisma from '@/lib/prisma';
import { successResponse, withErrorHandler, errorResponse } from '@/lib/api-utils';

// GET /api/courses/[id]
export async function GET(request: Request, { params }: { params: { id: string } }) {
  return withErrorHandler(async () => {
    const course = await prisma.course.findUnique({
      where: { id: params.id }
    });

    if (!course) {
      return errorResponse(`Course with ID ${params.id} does not exist.`, 404, "Not Found");
    }

    return successResponse(course);
  });
}

// PUT /api/courses/[id]
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return withErrorHandler(async () => {
    const body = await request.json();

    // Verify exists first
    const existing = await prisma.course.findUnique({ where: { id: params.id } });
    if (!existing) {
      return errorResponse("Not Found", 404);
    }

    const updatedCourse = await prisma.course.update({
      where: { id: params.id },
      data: {
        title: body.title ?? existing.title,
        price: body.price ? body.price.toString() : existing.price,
        level: body.level ?? existing.level,
      }
    });

    return successResponse(updatedCourse, 200, { message: "Resource updated successfully" });
  });
}

// DELETE /api/courses/[id]
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return withErrorHandler(async () => {
    // We wrap in a try-catch to handle the case where it doesn't exist
    try {
      await prisma.course.delete({
        where: { id: params.id }
      });
      return successResponse({ id: params.id }, 200, { message: `Course ${params.id} successfully deleted.` });
    } catch {
      return errorResponse("Cannot delete. Record does not exist.", 404, "Not Found");
    }
  });
}
