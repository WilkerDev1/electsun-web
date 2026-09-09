'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'El nombre de usuario y la contraseña son obligatorios.' };
  }

  try {
    await signIn('credentials', {
      username: username.trim(),
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Usuario o contraseña incorrectos.' };
        default:
          return { error: 'Error de autenticación. Por favor, inténtelo de nuevo.' };
      }
    }

    // Catch next redirect if any
    if (
      error &&
      typeof error === 'object' &&
      ('message' in error || 'name' in error || 'digest' in error)
    ) {
      const err = error as { message?: string; name?: string; digest?: string };
      if (
        err.message === 'NEXT_REDIRECT' ||
        err.message?.includes('NEXT_REDIRECT') ||
        err.name === 'RedirectError' ||
        err.digest?.startsWith('NEXT_REDIRECT')
      ) {
        return { success: true };
      }
    }

    console.error('Server login action error:', error);
    return { error: 'Usuario o contraseña incorrectos.' };
  }
}
