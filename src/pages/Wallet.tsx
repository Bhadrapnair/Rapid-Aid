import React from 'react';
import { Wallet as WalletIcon, CreditCard, TrendingUp } from 'lucide-react';

const Wallet: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wallet</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <WalletIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Balance</h3>
              <p className="text-2xl font-bold text-primary-600">$0.00</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-lg">
              <CreditCard className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Deposited</h3>
              <p className="text-2xl font-bold text-success-600">$0.00</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Donated</h3>
              <p className="text-2xl font-bold text-purple-600">$0.00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Funds</h2>
        <p className="text-gray-600 mb-4">Add money to your wallet to make donations</p>
        <button className="btn-primary">Add Funds with Stripe</button>
      </div>

      <div className="card mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
        <p className="text-gray-600">No transactions yet.</p>
      </div>
    </div>
  );
};

export default Wallet;
