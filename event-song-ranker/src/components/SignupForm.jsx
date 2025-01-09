import { useState } from 'react';
import { signup } from '../services/api';
import { getErrorMessage } from '../constants/errorMapping';
import { PASSWORD_REGEX, PASSWORD_REQUIREMENTS } from '../constants/validation';
import toast from 'react-hot-toast';

export default function SignupForm({ onToggleForm }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'attendee',
    profile: {
      phoneNumber: '',
      // Attendee fields
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      // Artist fields
      name: '',
      bio: '',
      genre: ''
    }
  });

  const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(formData.password)) {
      toast.error(`Password must contain: ${PASSWORD_REQUIREMENTS.requirements.join(', ')}`);
      return;
    }

    try {
      const response = await signup(formData);
      toast.success('Account created successfully!');
      localStorage.setItem('token', response.token);
    } catch (error) {
      toast.error(getErrorMessage(error.errorCode));
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="attendee"
              checked={formData.role === 'attendee'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Attendee</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="artist"
              checked={formData.role === 'artist'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Artist</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <p className="mt-1 text-sm text-gray-500">
            {PASSWORD_REQUIREMENTS.requirements.join(', ')}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.profile.phoneNumber}
            onChange={(e) => setFormData({
              ...formData,
              profile: { ...formData.profile, phoneNumber: e.target.value }
            })}
          />
        </div>

        {formData.role === 'attendee' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.profile.firstName}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, firstName: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.profile.lastName}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, lastName: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.profile.dateOfBirth}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, dateOfBirth: e.target.value }
                })}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Artist Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.profile.name}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, name: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows="3"
                value={formData.profile.bio}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, bio: e.target.value }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.profile.genre}
                onChange={(e) => setFormData({
                  ...formData,
                  profile: { ...formData.profile, genre: e.target.value }
                })}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <button
          onClick={onToggleForm}
          className="text-indigo-600 hover:text-indigo-500"
        >
          Login
        </button>
      </p>
    </div>
  );
}