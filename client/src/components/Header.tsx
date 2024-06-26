import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Define your Redux state interface
interface RootState {
  user: {
    currentUser: {
      profilePicture: string; // Adjust the type according to your actual data structure
      // Add other fields as needed
    };
    // Add other user-related state fields as needed
  };
  // Add other slices of your Redux state as needed
}

function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const hideLinks = ['/admin-login', '/admin-dashboard'].includes(location.pathname);

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to='/' className='text-white'>
          <h1 className='font-bold text-3xl'>UMS</h1>
        </Link>
        {!hideLinks && (
          <ul className='flex gap-6'>
            <li>
              <Link to='/' className='text-white text-lg hover:text-indigo-300 transition duration-300'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-white text-lg hover:text-indigo-300 transition duration-300'>
                About
              </Link>
            </li>
            <li>
              <Link to={currentUser ? '/profile' : '/login'} className='text-white text-lg hover:text-indigo-300 transition duration-300'>
                {currentUser ? (
                  <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
                ) : (
                  'Sign In'
                )}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Header;

// Example of using Header in another component:
// import Header from './Header';
// function App() {
//   return (
//     <div>
//       <Header />
//       {/* Other components */}
//     </div>
//   );
// }
