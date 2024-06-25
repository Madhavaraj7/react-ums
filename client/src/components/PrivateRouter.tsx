import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// Define your Redux state interface
interface RootState {
  user: {
    currentUser: {
      // Define the structure of currentUser as per your actual data
      // For example, if currentUser has profilePicture and other fields
      profilePicture: string;
      // Add other fields as needed
    } | null; // currentUser could be null if user is not authenticated
    // Add other user-related state fields as needed
  };
  // Add other slices of your Redux state as needed
}

export default function PrivateRoute() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return currentUser ? <Outlet /> : <Navigate to='/login' />;
}
