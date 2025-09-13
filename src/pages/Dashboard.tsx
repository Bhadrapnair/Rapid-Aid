import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart, TrendingUp, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const currentUser = { displayName: 'Test User' }; // Temporary for testing

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser?.displayName || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's an overview of your RapidAid activity
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link to="/create-request" className="card hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Plus className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Request</h3>
              <p className="text-gray-600">Start a new emergency fund request</p>
            </div>
          </div>
        </Link>

        <Link to="/wallet" className="card hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">My Wallet</h3>
              <p className="text-gray-600">Manage your funds and donations</p>
            </div>
          </div>
        </Link>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Community</h3>
              <p className="text-gray-600">Help verify requests and build trust</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">$0</div>
            <div className="text-gray-600">Total Donated</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">0</div>
            <div className="text-gray-600">Requests Helped</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-gray-600">Verifications</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-gray-600">Active Requests</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-gray-500">
          <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No recent activity yet. Start by creating a request or making a donation!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
