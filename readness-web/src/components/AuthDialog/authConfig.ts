import type { AuthMode } from '@/types/auth';

interface ModeConfig {
  title: string;
  fallbackText?: string;
  fallbackActionText?: string;
  fallbackTargetMode?: AuthMode;
}

export const authConfig: Record<AuthMode, ModeConfig> = {
  login: {
    title: 'Log In',
    fallbackText: "Don't have an account?",
    fallbackActionText: 'Sign Up',
    fallbackTargetMode: 'signup',
  },
  signup: {
    title: 'Sign Up',
    fallbackText: 'Already have an account?',
    fallbackActionText: 'Log In',
    fallbackTargetMode: 'login',
  },
  otp: {
    title: 'Verify Your Email',
  },
  'forgot-password': {
    title: 'Reset Password',
    fallbackText: 'Remembered your password?',
    fallbackActionText: 'Log In',
    fallbackTargetMode: 'login',
  },
  'reset-password': {
    title: 'Set New Password',
  },
};
