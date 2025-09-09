import React, { useState } from 'react';
import {EyeClosed, Eye} from "lucide-react";
import {Link} from "react-router";

// The main App component containing the registration form.
const Register = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});
  // State to track successful submission
  const [submissionStatus, setSubmissionStatus] = useState(null);
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes and update form data state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Basic validation for the form fields
  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!formData.name) newErrors.name = 'Name is required.';
  //   if (!formData.email) {
  //     newErrors.email = 'Email is required.';
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = 'Email address is invalid.';
  //   }
  //   if (!formData.password) {
  //     newErrors.password = 'Password is required.';
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = 'Password must be at least 6 characters.';
  //   }
  //   if (formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = 'Passwords do not match.';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const api = import.meta.env.VITE_BACKEND_API;
    const submitForm = async ()=>{
        const response = await fetch(`${api}/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        });
        const data = await response.json();
        if(data.msg){
            console.log(data.msg);
        }
    }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus(null); // Reset submission status

    submitForm();
    // if (validateForm()) {
    //   console.log('Form data submitted:', formData);
    //   setSubmissionStatus('success');
    //   // Clear the form after successful submission
    //   setFormData({
    //     name: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //   });
    //   setErrors({});
    // } else {
    //   setSubmissionStatus('error');
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 mt-8 px-3 py-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeClosed/> : <Eye/>}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 mt-8 px-3 py-2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeClosed/> : <Eye/>}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submission Status Message */}
          {submissionStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative">
              <span className="block sm:inline">Registration successful!</span>
            </div>
          )}

          {submissionStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative">
              <span className="block sm:inline">Please correct the errors and try again.</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
