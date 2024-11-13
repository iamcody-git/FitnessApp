import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addToUserProfile } from '../../store/userProfileSlice';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    fitness_level: '',
    activity_level: '',
    goal: '',
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate=useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); 
    dispatch(addToUserProfile(formData)).then(() => {
      navigate('/userprofile/dashboard');
    }
    )
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="age">
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="gender">
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="fitness_level">
          Fitness Level:
        </label>
        <select
          id="fitness_level"
          name="fitness_level"
          value={formData.fitness_level}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="activity_level">
          Activity Level:
        </label>
        <select
          id="activity_level"
          name="activity_level"
          value={formData.activity_level}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2" htmlFor="goal">
          Goal:
        </label>
        <select
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="weight_loss">weight loss</option>
          <option value="muscle_gain">muscle gain</option>
          <option value="general_fitness">general fitness</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default UserProfile;
