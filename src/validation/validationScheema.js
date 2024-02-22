import * as yup from 'yup';

const emailSchema = yup.string().email('Invalid email format').required('Email is required');
const passwordSchema = yup.string().min(3, 'Password must be at least 4 characters').required('Password is required');

export const SignInScheema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema
});
