import React, { useState } from 'react';
import { Wallet as WalletIcon, CreditCard, TrendingUp, Plus, Minus, ArrowUpDown } from 'lucide-react';

const Wallet: React.FC = () => {
  const balance = 0;
  const transactions: any[] = [];
  const loading = false;
  const totalDonated = 0;
  
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const totalDeposited = 0;

  const handleAddFunds = async (e: React.FormEvent) => {
    e.preventDefault();
    const fundAmount = parseFloat(amount);
    
    if (fundAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    try {
      setProcessing(true);
      setError('');
      // Simulate adding funds
      setTimeout(() => {
        setAmount('');
        setShowAddFunds(false);
        setProcessing(false);
      }, 1000);
    } catch (error) {
      setError('Failed to add funds. Please try again.');
      setProcessing(false);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (withdrawAmount > balance) {
      setError('Insufficient balance');
      return;
    }

    try {
      setProcessing(true);
      setError('');
      // Simulate withdrawal
      setTimeout(() => {
        setAmount('');
        setShowWithdraw(false);
        setProcessing(false);
      }, 1000);
    } catch (error) {
      setError('Failed to withdraw funds. Please try again.');
      setProcessing(false);
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
              <p className="text-2xl font-bold text-primary-600">${balance.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-success-600">${totalDeposited.toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-purple-600">${totalDonated.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Add Funds */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Add Funds</h2>
            <button
              onClick={() => setShowAddFunds(!showAddFunds)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Money
            </button>
          </div>
          
          {showAddFunds && (
            <form onSubmit={handleAddFunds} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="add-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  id="add-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field"
                  placeholder="Enter amount"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={processing}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Add Funds'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddFunds(false);
                    setAmount('');
                    setError('');
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          
          <p className="text-gray-600 text-sm">
            Add money to your wallet using secure payment methods to make donations instantly.
          </p>
        </div>

        {/* Withdraw Funds */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Withdraw Funds</h2>
            <button
              onClick={() => setShowWithdraw(!showWithdraw)}
              className="btn-secondary"
            >
              <Minus className="h-4 w-4 mr-2" />
              Withdraw
            </button>
          </div>
          
          {showWithdraw && (
            <form onSubmit={handleWithdraw} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  id="withdraw-amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field"
                  placeholder="Enter amount"
                  min="1"
                  step="0.01"
                  max={balance}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available: ${balance.toLocaleString()}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={processing}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : 'Withdraw'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWithdraw(false);
                    setAmount('');
                    setError('');
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          
          <p className="text-gray-600 text-sm">
            Withdraw funds from your wallet to your bank account.
          </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
        
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'deposit' ? 'bg-success-100' :
                    transaction.type === 'withdrawal' ? 'bg-orange-100' : 'bg-purple-100'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <Plus className="h-4 w-4 text-success-600" />
                    ) : transaction.type === 'withdrawal' ? (
                      <Minus className="h-4 w-4 text-orange-600" />
                    ) : (
                      <ArrowUpDown className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    transaction.amount > 0 ? 'text-success-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <WalletIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No transactions yet. Add funds to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
