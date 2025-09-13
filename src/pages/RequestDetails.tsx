import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Shield, 
  Calendar, 
  CheckCircle,
  AlertCircle,
  Clock,
  MessageCircle
} from 'lucide-react';
import type { FundRequest } from '../types';

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const balance = 0;
  const currentUser = { uid: 'test-user' };
  
  const [request, setRequest] = useState<FundRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donationMessage, setDonationMessage] = useState('');
  const [donating, setDonating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRequest = async () => {
      if (!id) return;
      
      try {
        // Simulate loading request
        setTimeout(() => {
          setRequest(null);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading request:', error);
        setError('Failed to load request details');
        setLoading(false);
      }
    };

    loadRequest();
  }, [id]);

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!request || !currentUser) return;
    
    const amount = parseFloat(donationAmount);
    if (amount <= 0) {
      setError('Please enter a valid donation amount');
      return;
    }

    if (amount > balance) {
      setError('Insufficient wallet balance');
      return;
    }

    try {
      setDonating(true);
      setError('');
      
      // Simulate donation
      setTimeout(() => {
        setDonationAmount('');
        setDonationMessage('');
        setIsAnonymous(false);
        setDonating(false);
      }, 1000);
      
    } catch (error) {
      console.error('Donation error:', error);
      setError('Failed to process donation');
      setDonating(false);
    }
  };

  const handleVerify = async () => {
    if (!request || !currentUser) return;
    
    try {
      // Simulate verification
      console.log('Verifying request...');
    } catch (error) {
      console.error('Verification error:', error);
      setError('Failed to verify request');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Request Not Found</h1>
          <p className="text-gray-600 mb-8">The fund request you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = 0;
  const donations: any[] = [];
  const isOwner = false;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{request.title}</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Bar */}
          <div className="card">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">
                  ${request.currentAmount.toLocaleString()} of ${request.targetAmount.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-primary-600">
                  {progressPercentage.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-600">
                  {donations.length} donations
                </span>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Details</h2>
            <p className="text-gray-700 mb-6">{request.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-medium">{request.createdAt.toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Urgency</p>
                  <p className="font-medium capitalize">{request.urgency}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium capitalize">{request.category}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Verification</p>
                  <p className="font-medium">
                    {request.isVerified ? (
                      <span className="text-success-600 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-yellow-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Pending ({request.verificationCount}/3)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Donations */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Donations</h2>
            {donations.length > 0 ? (
              <div className="space-y-3">
                {donations.slice(0, 5).map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="font-medium">
                          {donation.isAnonymous ? 'Anonymous Donor' : 'Generous Donor'}
                        </p>
                        {donation.message && (
                          <p className="text-sm text-gray-600 flex items-center">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            "{donation.message}"
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">${donation.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{donation.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No donations yet. Be the first to help!</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Donation Form */}
          {!isOwner && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Make a Donation</h3>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleDonation} className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="input-field"
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available balance: ${balance.toLocaleString()}
                  </p>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                    className="input-field"
                    rows={3}
                    placeholder="Leave a message of support..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-900">
                    Donate anonymously
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={donating || !donationAmount}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {donating ? 'Processing...' : 'Donate Now'}
                </button>
              </form>
            </div>
          )}

          {/* Verification */}
          {!isOwner && !request.isVerified && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Verify</h3>
              <p className="text-gray-600 mb-4">
                Help verify this request to build trust in the community.
              </p>
              <button
                onClick={handleVerify}
                className="w-full btn-secondary"
              >
                Verify Request
              </button>
            </div>
          )}

          {/* Status */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium capitalize ${
                  request.status === 'completed' ? 'text-success-600' :
                  request.status === 'active' ? 'text-primary-600' : 'text-gray-600'
                }`}>
                  {request.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verifications:</span>
                <span className="font-medium">{request.verificationCount}/3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Donations:</span>
                <span className="font-medium">{donations.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
