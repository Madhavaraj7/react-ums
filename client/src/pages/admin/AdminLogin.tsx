import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../../redux/store';
import { signInStart, signInSuccess, signInFailure } from '../../redux/admin/adminSlice';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',

};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^\S*$/, 'No spaces allowed in the email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/^\S*$/, 'No spaces allowed in the password')
    .required('Password is required'),
});

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.admin);

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    dispatch(signInStart());

    try {
      const res = await fetch('http://localhost:3000/api/admin/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Something went wrong!';

        if (res.status === 404) {
          errorMessage = 'Admin not found';
        } else if (res.status === 401) {
          errorMessage = 'Wrong credentials';
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }

        throw new Error(errorMessage);
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      toast.success('Admin login successful!');

      // Delay navigation after showing toast
      setTimeout(() => {
        navigate('/admin-dashboard');
      }, 3000); // Adjust delay time as needed

    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
      const errorMessage = (err as Error).message;
      dispatch(signInFailure(errorMessage));
      toast.error(errorMessage);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Admin Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******************"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 w-full ${isSubmitting || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={isSubmitting || loading}
                >
                  {loading ? 'Logging In...' : 'Login'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
