export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isVerified: boolean;
  walletBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FundRequest {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  category: 'medical' | 'emergency' | 'education' | 'other';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'completed' | 'cancelled';
  isVerified: boolean;
  verificationCount: number;
  documents: string[]; // URLs to uploaded documents
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
}

export interface Donation {
  id: string;
  fundRequestId: string;
  donorId: string;
  amount: number;
  isAnonymous: boolean;
  message?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'donation_received' | 'request_funded' | 'verification_request' | 'new_request';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: any; // Additional data for the notification
}

export interface WalletTransaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'donation';
  amount: number;
  description: string;
  fundRequestId?: string;
  createdAt: Date;
}
