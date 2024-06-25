import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Login: React.FC = () => {
  const initialFormData = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInStart());
  
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        let errorMessage = 'Something went wrong!';
  
        if (res.status === 404) {
          errorMessage = 'User not found';
        } else if (res.status === 401) {
          errorMessage = 'Wrong credentials';
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
  
        throw new Error(errorMessage);
      }
  
      const data = await res.json();
      dispatch(signInSuccess(data));
      toast.success('Login successful!');
  
      // Delay navigation after showing toast
      setTimeout(() => {
        setFormData(initialFormData); // Reset form fields
        navigate('/'); // Navigate to the home page after timeout
      }, 3000); // Adjust delay time as needed
  
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
      const errorMessage = (err as Error).message;
      dispatch(signInFailure(errorMessage));
      toast.error(errorMessage);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
          <div className="mt-6 text-center">
            <span className="text-gray-700 text-sm">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-indigo-500 hover:text-indigo-700 font-semibold transition duration-300">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
