'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
    designation: '',
    nid: '',
    profilepic: null, // Use null for file upload
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e: { target: { name: any; value: any; type: any; files: any; }; }) => {
    const { name, value, type, files } = e.target;
    // If the input is a file input, set the profilepic to the file
    const newValue = type === 'file' ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (!formData.email.trim() || !formData.email.includes('@aiub.edu')) {
      newErrors.email = 'Invalid or non-AIUB email address';
      valid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (!formData.phoneNumber.trim() || !/^(01\d{9})$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format. Should be 11 digits starting with 01';
      valid = false;
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
      valid = false;
    }

    if (!formData.nid.trim() || !/^\d{10}$/.test(formData.nid)) {
      newErrors.nid = 'Invalid Bangladeshi NID number format. Should be 10 digits';
      valid = false;
    }

    if (!formData.profilepic) {
      newErrors.profilepic = 'Profile Picture is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formDataForUpload = new FormData();
        // Append all form data to formDataForUpload
        for (let key in formData) {
          formDataForUpload.append(key, formData[key]);
        }

        const response = await axios.post("http://localhost:3000/admin/createadminaccount", formDataForUpload);
        console.log("Response:", response.data);
        setMessage('Admin account created successfully!');
        // Clear form data after successful submission
        setFormData({
          username: '',
          password: '',
          email: '',
          name: '',
          address: '',
          phoneNumber: '',
          designation: '',
          nid: '',
          profilepic: null, // Reset file input
        });
        setErrors({});
      } catch (error) {
        console.error("Error creating admin account:", error);
        setMessage('Error creating admin account. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 text-lg text-black">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 text-lg text-black">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-lg text-black">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-lg text-black">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1 text-lg text-black">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block mb-1 text-lg text-black">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="designation" className="block mb-1 text-lg text-black">Designation:</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Enter your designation"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.designation && <p className="text-red-500 mt-1">{errors.designation}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="nid" className="block mb-1 text-lg text-black">NID:</label>
          <input
            type="text"
            id="nid"
            name="nid"
            value={formData.nid}
            onChange={handleChange}
            placeholder="Enter your NID number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            
          />
          {errors.nid && <p className="text-red-500 mt-1">{errors.nid}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="profilepic" className="block mb-1 text-lg text-black">Profile Picture:</label>
          <input
            type="file"
            id="profilepic"
            name="profilepic"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.profilepic && <p className="text-red-500 mt-1">{errors.profilepic}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Sign Up</button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
}
