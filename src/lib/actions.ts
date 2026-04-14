'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // Make sure to match the provider id 'credentials' configured in auth.ts
    // with redirectTo parameter we can specify where to go or rely on Auth.js callback defaults
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong during authentication.';
      }
    }
    throw error;
  }
}

export async function createCourse(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const duration = formData.get('duration') as string;
  const level = formData.get('level') as string;
  const price = formData.get('price') as string;
  const technologies = formData.get('technologies') as string;
  const features = formData.get('features') as string;
  const popular = formData.get('popular') === 'on';

  await prisma.course.create({
    data: {
      title,
      description,
      duration,
      level,
      price,
      technologies,
      features,
      popular
    }
  });

  revalidatePath('/admin');
  revalidatePath('/admin/courses');
  redirect('/admin/courses');
}

export async function createBatch(formData: FormData) {
  const name = formData.get('name') as string;
  const startDateStr = formData.get('startDate') as string;
  const schedule = formData.get('schedule') as string;
  const courseId = formData.get('courseId') as string;
  const instructorId = formData.get('instructorId') as string;

  // Convert HTML date string to JS Date object
  const startDate = new Date(startDateStr);

  await prisma.batch.create({
    data: {
      name,
      startDate,
      schedule,
      courseId,
      instructorId: instructorId || null,
    }
  });

  revalidatePath('/admin');
  revalidatePath('/admin/batches');
  redirect('/admin/batches');
}

export async function enrollStudent(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const batchId = formData.get('batchId') as string;

  await prisma.enrollment.create({
    data: {
      studentId,
      batchId,
      paymentStatus: 'PENDING',
      progress: 0,
    }
  });

  revalidatePath(`/admin/students/${studentId}`);
  revalidatePath('/admin');
}

export async function updatePaymentStatus(formData: FormData) {
  const enrollmentId = formData.get('enrollmentId') as string;
  const paymentStatus = formData.get('paymentStatus') as string;
  const studentId = formData.get('studentId') as string;

  await prisma.enrollment.update({
    where: { id: enrollmentId },
    data: { paymentStatus },
  });

  revalidatePath(`/admin/students/${studentId}`);
  revalidatePath('/admin');
}
