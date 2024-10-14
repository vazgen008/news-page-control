import React, { useEffect, useState } from 'react';
import './AllUsers.css'
import  Axios  from 'axios';
// Sample users data

const UsersTable = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get(`https://news-1a134-default-rtdb.firebaseio.com/.json`);
        // Assuming the response data is an array of users
      const fetchedData = Object.values(response.data);

        setUsers(fetchedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  const handleVerify = async (userId,status) => {
    await Axios.patch(`https://news-1a134-default-rtdb.firebaseio.com//${userId}.json`, { Verified: status });       
    const Users = await Axios.get(`https://news-1a134-default-rtdb.firebaseio.com/.json`);
    setUsers(Object.values(Users.data))

  };

  useEffect(() => {
        
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1000); // 2 seconds delay

    return () => clearTimeout(timer);
}, []);

if (isLoading) {
    return <div>Loading...</div>; // Loading indicator
}

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Username</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Current Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.Verified}</td>
              <td className='actions'>
                <button onClick={() => handleVerify(user.id,'Verified')} className='Verify'>Verify</button>
                <button onClick={() => handleVerify(user.id,'Pending')} className='Pending'>Pending</button>
                <button onClick={() => handleVerify(user.id,'Rejected')} className='Reject'>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
