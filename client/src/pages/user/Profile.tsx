import { useSelector } from 'react-redux';

// Define your Redux state interface
interface User {
  profilePicture: string;
  username: string;
  email: string;
  // Add other fields as needed
}

interface RootState {
  user: {
    currentUser: User;
    // Add other user-related state fields as needed
  };
  // Add other slices of your Redux state as needed
}

function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <div className='p-3 max-w-lg mx-auto mt-10'>
    <h1 className='text-3xl font-semibold text-center my-7'>PROFILE</h1>
    <form className="flex flex-col gap-4">
      <img 
        src={currentUser.profilePicture} 
        alt="Profile" 
        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" 
      />
      <input 
        defaultValue={currentUser.username} 
        type="text" 
        id='username' 
        placeholder='Username' 
        className='bg-slate-100 rounded-lg p-3' 
      />
      <input 
        defaultValue={currentUser.email} 
        type="email" 
        id='email' 
        placeholder='Email' 
        className='bg-slate-100 rounded-lg p-3' 
      />
      <input 
        type="password" 
        id='password' 
        placeholder='Password' 
        className='bg-slate-100 rounded-lg p-3' 
      />
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        Update
      </button>
    </form>
    <div className='flex justify-between'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-red-700 cursor-pointer'>Sign Out</span>

    </div>
  </div>
  );
}

export default Profile;
