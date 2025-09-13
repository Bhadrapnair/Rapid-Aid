import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, WalletTransaction } from '../types';
import { useAuth } from './AuthContext';

interface WalletContextType {
  balance: number;
  transactions: WalletTransaction[];
  loading: boolean;
  addFunds: (amount: number, paymentMethod: string) => Promise<void>;
  withdrawFunds: (amount: number) => Promise<void>;
  makeDonation: (amount: number, fundRequestId: string) => Promise<void>;
  getTransactionHistory: () => WalletTransaction[];
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, updateUserProfile } = useAuth();

  // Load wallet data
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Load user balance
    const loadBalance = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        setBalance(userData.walletBalance || 0);
      }
    };

    // Load transactions
    const q = query(
      collection(db, 'walletTransactions'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactionsList: WalletTransaction[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        transactionsList.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as WalletTransaction);
      });
      setTransactions(transactionsList);
      setLoading(false);
    });

    loadBalance();

    return unsubscribe;
  }, [currentUser]);

  const addTransaction = async (transaction: Omit<WalletTransaction, 'id'>) => {
    if (!currentUser) throw new Error('User must be authenticated');

    await addDoc(collection(db, 'walletTransactions'), {
      ...transaction,
      createdAt: Timestamp.fromDate(transaction.createdAt),
    });
  };

  const updateBalance = async (newBalance: number) => {
    if (!currentUser) throw new Error('User must be authenticated');

    await updateUserProfile({ walletBalance: newBalance });
    setBalance(newBalance);
  };

  const addFunds = async (amount: number, paymentMethod: string) => {
    if (amount <= 0) throw new Error('Amount must be greater than 0');

    const newBalance = balance + amount;
    
    await addTransaction({
      userId: currentUser!.uid,
      type: 'deposit',
      amount,
      description: `Deposit via ${paymentMethod}`,
      createdAt: new Date(),
    });

    await updateBalance(newBalance);
  };

  const withdrawFunds = async (amount: number) => {
    if (amount <= 0) throw new Error('Amount must be greater than 0');
    if (amount > balance) throw new Error('Insufficient funds');

    const newBalance = balance - amount;
    
    await addTransaction({
      userId: currentUser!.uid,
      type: 'withdrawal',
      amount: -amount,
      description: 'Withdrawal to bank account',
      createdAt: new Date(),
    });

    await updateBalance(newBalance);
  };

  const makeDonation = async (amount: number, fundRequestId: string) => {
    if (amount <= 0) throw new Error('Amount must be greater than 0');
    if (amount > balance) throw new Error('Insufficient funds');

    const newBalance = balance - amount;
    
    await addTransaction({
      userId: currentUser!.uid,
      type: 'donation',
      amount: -amount,
      description: `Donation to fund request`,
      fundRequestId,
      createdAt: new Date(),
    });

    await updateBalance(newBalance);
  };

  const getTransactionHistory = (): WalletTransaction[] => {
    return transactions;
  };

  const value: WalletContextType = {
    balance,
    transactions,
    loading,
    addFunds,
    withdrawFunds,
    makeDonation,
    getTransactionHistory,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
