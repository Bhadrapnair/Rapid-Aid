import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart, TrendingUp, Users, DollarSign, Clock, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const currentUser = { displayName: 'Test User' }; // Temporary for testing
  const fundRequests: any[] = []; // Temporary empty array
  const requestsLoading = false;
  const donations: any[] = []; // Temporary empty array
  const balance = 0;

  // Calculate user's statistics
  const userRequests: any[] = [];
  const activeRequests: any[] = [];
  const completedRequests: any[] = [];
  const totalDonated = 0;
  const userDonations: any[] = [];
  const verifications = 0;

  // Recent activity (last 5 items)
  const recentActivity: any[] = [];

  if (requestsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

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
              <p className="text-gray-600">Balance: ${balance.toLocaleString()}</p>
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
            <div className="text-2xl font-bold text-primary-600">${totalDonated.toLocaleString()}</div>
            <div className="text-gray-600">Total Donated</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">{userDonations.length}</div>
            <div className="text-gray-600">Requests Helped</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{verifications}</div>
            <div className="text-gray-600">Verifications</div>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{activeRequests.length}</div>
            <div className="text-gray-600">Active Requests</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Requests */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Requests</h2>
            <Link to="/create-request" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Create New
            </Link>
          </div>
          
          {userRequests.length > 0 ? (
            <div className="space-y-4">
              {userRequests.slice(0, 3).map((request) => {
                const progressPercentage = (request.currentAmount / request.targetAmount) * 100;
                return (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{request.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        request.status === 'completed' ? 'bg-success-100 text-success-800' :
                        request.status === 'active' ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>${request.currentAmount.toLocaleString()} of ${request.targetAmount.toLocaleString()}</span>
                        <span>{progressPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">{request.category}</span>
                      <Link 
                        to={`/request/${request.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No requests yet. Create your first emergency fund request!</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'request' ? 'bg-primary-100' : 'bg-success-100'
                  }`}>
                    {activity.type === 'request' ? (
                      <Plus className="h-4 w-4 text-primary-600" />
                    ) : (
                      <Heart className="h-4 w-4 text-success-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.type === 'request' 
                        ? `Created request: ${activity.data.title}`
                        : `Donated $${activity.data.amount.toLocaleString()}`
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No recent activity yet. Start by creating a request or making a donation!</p>
            </div>
          )}
        </div>
      </div>

      {/* Featured Requests */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Requests</h2>
        
        {fundRequests.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundRequests
              .filter(req => req.status === 'active' && req.isVerified)
              .slice(0, 3)
              .map((request) => {
                const progressPercentage = (request.currentAmount / request.targetAmount) * 100;
                return (
                  <Link 
                    key={request.id} 
                    to={`/request/${request.id}`}
                    className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="mb-3">
                      <h3 className="font-medium text-gray-900 mb-1">{request.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>${request.currentAmount.toLocaleString()} of ${request.targetAmount.toLocaleString()}</span>
                        <span>{progressPercentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 capitalize">{request.category}</span>
                      <span className="text-primary-600 font-medium">Help Now</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No featured requests available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
