import { successResponse, withErrorHandler, errorResponse } from '@/lib/api-utils';

// GET /api/courses
export async function GET(request: Request) {
  return withErrorHandler(async () => {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');
    const query = level ? { where: { level: { contains: level, mode: 'insensitive' } } } : {};

    const courses = await prisma.course.findMany(query as { where?: { level?: { contains?: string, mode?: "insensitive" | "default" } } });

    return successResponse(courses, 200, { count: courses.length });
  });
}

// POST /api/courses
export async function POST(request: Request) {
  return withErrorHandler(async () => {
    const body = await request.json();

    if (!body.title || !body.price) {
      return errorResponse("Missing required fields: 'title' and 'price' are mandatory.", 400, "Bad Request");
    }

    const newCourse = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description || "API Generated Description",
        duration: body.duration || "Custom",
        level: body.level || "Beginner",
        technologies: body.technologies || "API Testing",
        features: body.features || "Automated Creation",
        price: body.price.toString(),
        popular: body.popular || false
      }
    });

    return successResponse(newCourse, 201, { message: "Course successfully created via API" });
  });
}
