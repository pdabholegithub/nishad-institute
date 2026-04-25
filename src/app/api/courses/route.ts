import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/courses
// Perfect for API Automation Testing (Postman, Playwright API, RestAssured)
export async function GET(request: Request) {
  try {
    // Optional: Get URL parameters for filtering (e.g., ?level=Beginner)
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');

    const query = level ? { where: { level: { contains: level, mode: 'insensitive' } } } : {};

    const courses = await prisma.course.findMany(query as any);

    return NextResponse.json({
      success: true,
      count: courses.length,
      data: courses,
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
      message: error.message
    }, { status: 500 });
  }
}

// POST /api/courses
// Used for testing Create API automation
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Negative Scenario Testing: Check for required fields
    if (!body.title || !body.price) {
      return NextResponse.json({
        success: false,
        error: "Bad Request",
        message: "Missing required fields: 'title' and 'price' are mandatory."
      }, { status: 400 }); // Status 400 for negative test assertion
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

    return NextResponse.json({
      success: true,
      message: "Course successfully created via API",
      data: newCourse
    }, { status: 201 }); // Status 201 Created

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: "Internal Server Error",
      message: error.message
    }, { status: 500 });
  }
}
