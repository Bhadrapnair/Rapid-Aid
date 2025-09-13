import React from 'react';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const Profile: React.FC = () => {
  const currentUser = { 
    displayName: 'Test User', 
    email: 'test@example.com',
    isVerified: false,
    createdAt: new Date()
  }; // Temporary for testing

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{currentUser?.displayName || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{currentUser?.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Verification Status</p>
                <p className="font-medium">
                  {currentUser?.isVerified ? (
                    <span className="text-success-600">Verified</span>
                  ) : (
                    <span className="text-yellow-600">Pending Verification</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">
                  {currentUser?.createdAt?.toLocaleDateString() || 'Unknown'}
                </p>
              </div>
            </div>
          </div>

          <button className="btn-primary mt-6">Edit Profile</button>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <button className="w-full btn-secondary">Change Password</button>
            <button className="w-full btn-secondary">Update Email</button>
            <button className="w-full btn-secondary">Privacy Settings</button>
            <button className="w-full btn-secondary">Notification Preferences</button>
          </div>
        </div>
      </div>

      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Identity Verification</h2>
        <p className="text-gray-600 mb-4">
          Verify your identity to build trust with donors and unlock additional features.
        </p>
        <button className="btn-primary">Start Verification Process</button>
      </div>
    </div>
  );
};

export default Profile;
