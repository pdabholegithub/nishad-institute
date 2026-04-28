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
    const email = formData.get('email') as string;
    const redirectTo = email === 'admin@nis.com' ? '/admin' : '/student';
    await signIn('credentials', { ...Object.fromEntries(formData), redirectTo });
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
  const securityPin = formData.get('securityPin') as string;
  const MASTER_PIN = process.env.ADMIN_SECURITY_PIN || "Nishad2026";

  if (securityPin !== MASTER_PIN) {
    throw new Error("Invalid Security PIN. Authorization failed.");
  }

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

export async function updateCourse(formData: FormData) {
  const securityPin = formData.get('securityPin') as string;
  const MASTER_PIN = process.env.ADMIN_SECURITY_PIN || "1234";

  if (securityPin !== MASTER_PIN) {
    throw new Error("Invalid Security PIN. Authorization failed.");
  }

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const duration = formData.get('duration') as string;
  const level = formData.get('level') as string;
  const price = formData.get('price') as string;
  const technologies = formData.get('technologies') as string;
  const features = formData.get('features') as string;
  const popular = formData.get('popular') === 'on';

  await prisma.course.update({
    where: { id },
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

export async function deleteCourse(formData: FormData) {
  const securityPin = formData.get('securityPin') as string;
  const MASTER_PIN = process.env.ADMIN_SECURITY_PIN || "Nishad2026";

  if (securityPin !== MASTER_PIN) {
    throw new Error("Invalid Security PIN. Authorization failed.");
  }

  const courseId = formData.get('courseId') as string;
  await prisma.course.delete({ where: { id: courseId } });
  revalidatePath('/admin/courses');
  revalidatePath('/');
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

import bcrypt from 'bcryptjs';

export async function registerUser(prevState: string | undefined, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      return 'Please fill all fields.';
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return 'Email already in use.';
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'STUDENT',
      },
    });

    // Auto-login after registration and force redirect to student dashboard
    await signIn('credentials', { email, password, redirectTo: '/student' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

import { signOut } from '@/auth';

export async function logout() {
  await signOut();
}
export async function updateSiteSetting(formData: FormData) {
  const key = formData.get('key') as string;
  const value = formData.get('value') as string;

  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath('/');
  revalidatePath('/admin/settings');
}
