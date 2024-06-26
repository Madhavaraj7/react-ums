import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

type User = {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
};

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const admin = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();

  const getAllUsers = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/get-users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center mt-12">
        <div className="relative overflow-x-auto w-[80%] mt-4">
          <div className="flex justify-between items-center my-4">
            <h1 className="text-3xl font-bold">Users List</h1>
            <button
              onClick={() => navigate("/admin/add-user")}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
            >
              Add User
            </button>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Username</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Profile Picture</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 p-2 text-white rounded mr-3"
                      onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 p-2 text-white rounded"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Function to handle user deletion
  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/delete-user/${userId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };
};

export default AdminDashboard;
