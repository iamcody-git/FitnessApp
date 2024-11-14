import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserProfileById } from '../../store/userProfileSlice';

const UserDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { status, singleUser,recommendedPackage } = useAppSelector((state) => state.userProfile);

  useEffect(() => {
    console.log('useEffect triggered, ID:', id);
    if (id) {
      dispatch(fetchUserProfileById(id));
    } else {
      console.log("No id provided, cannot fetch profile.");
    }
  }, [id, dispatch]);
  console.log('Current status:', status);
console.log('Current singleUser:', singleUser);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!singleUser) {
    return <div>No user profile found.</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
        <h2>Profile Information</h2>
        <p><strong>ID:</strong> {singleUser.id}</p>
        <p><strong>Age:</strong> {singleUser.age}</p>
        <p><strong>Gender:</strong> {singleUser.gender}</p>
        <p><strong>Fitness Level:</strong> {singleUser.fitness_level}</p>
        <p><strong>Activity Level:</strong> {singleUser.activity_level}</p>
        <p><strong>Goal:</strong> {singleUser.goal}</p>
        <p><strong>Created At:</strong> {new Date(singleUser.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(singleUser.updatedAt).toLocaleString()}</p>
        <h2>User Information</h2>
        <p><strong>User ID:</strong> {singleUser.User?.id}</p>
        <p><strong>Email:</strong> {singleUser.User?.email}</p>
        <h2>Recommended Package</h2>
        {/* <p><strong>Package:</strong> {recommendedPackage || 'N/A'}</p> */}
      </div>
    </div>
  );
};

export default UserDashboard;
