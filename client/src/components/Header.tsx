import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/' className='text-white'>
          <h1 className='font-bold text-3xl'>U M S</h1>
        </Link>
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
            <Link to='/login' className='text-white text-lg hover:text-indigo-300 transition duration-300'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
