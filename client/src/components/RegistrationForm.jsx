// src/components/RegistrationForm.js
import { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        // Redirect or show a success message here
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.error);
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Handle other errors (e.g., network issues)
    }
  };

  return (
    <div className='bg-white p-12 flex flex-col gap-6 rounded-md w-full md:max-w-[600px] shadow-md'>
      <h2 className='text-2xl border-b-2 pb-4'>Registration</h2>
      <form 
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label htmlFor="username">Username:</label>
          <input
            className='bg-gray-200 rounded-md py-1 px-4'
            placeholder='Username'
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password">Password:</label>
          <input
            className='bg-gray-200 rounded-md py-1 px-4'
            placeholder='Password'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button 
            className='py-2 bg-green-400 px-6 rounded-md hover:bg-green-500'
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
