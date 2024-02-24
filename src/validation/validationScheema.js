import * as yup from 'yup';

const emailSchema = yup.string().email('Invalid email format').required('Email is required');
const passwordSchema = yup.string().min(3, 'Password must be at least 4 characters').required('Password is required');

export const SignInScheema = yup.object().shape({
  email: emailSchema,
  password: passwordSchema
});


export const SignUpSchema = yup.object().shape({
  firstname: yup.string()
    .required('First Name is required'),
  lastname: yup.string()
    .required('Last Name is required'),
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirm_password: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  mobile: yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Mobile number must be 10 digits')
    .max(10, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
});
