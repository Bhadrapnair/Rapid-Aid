import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Donation, FundRequest } from '../types';
import { useAuth } from './AuthContext';
import { useFundRequests } from './FundRequestContext';

interface DonationContextType {
  donations: Donation[];
  loading: boolean;
  makeDonation: (fundRequestId: string, amount: number, isAnonymous: boolean, message?: string) => Promise<void>;
  getDonationsForRequest: (requestId: string) => Donation[];
  getTotalDonated: () => number;
}

const DonationContext = createContext<DonationContextType>({} as DonationContextType);

export const useDonations = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
};

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { updateFundRequest } = useFundRequests();

  // Real-time listener for donations
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'donations'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donationsList: Donation[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        donationsList.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as Donation);
      });
      setDonations(donationsList);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const makeDonation = async (
    fundRequestId: string, 
    amount: number, 
    isAnonymous: boolean, 
    message?: string
  ) => {
    if (!currentUser) throw new Error('User must be authenticated');
    if (amount <= 0) throw new Error('Donation amount must be greater than 0');

    // Create donation record
    const donation: Omit<Donation, 'id'> = {
      fundRequestId,
      donorId: currentUser.uid,
      amount,
      isAnonymous,
      message,
      createdAt: new Date(),
    };

    await addDoc(collection(db, 'donations'), {
      ...donation,
      createdAt: Timestamp.fromDate(donation.createdAt),
    });

    // Update fund request with new amount
    const requestRef = doc(db, 'fundRequests', fundRequestId);
    const requestDoc = await getDoc(requestRef);
    
    if (requestDoc.exists()) {
      const requestData = requestDoc.data();
      const newAmount = (requestData.currentAmount || 0) + amount;
      
      await updateFundRequest(fundRequestId, {
        currentAmount: newAmount,
        status: newAmount >= requestData.targetAmount ? 'completed' : 'active',
      });
    }
  };

  const getDonationsForRequest = (requestId: string): Donation[] => {
    return donations.filter(donation => donation.fundRequestId === requestId);
  };

  const getTotalDonated = (): number => {
    if (!currentUser) return 0;
    return donations
      .filter(donation => donation.donorId === currentUser.uid)
      .reduce((total, donation) => total + donation.amount, 0);
  };

  const value: DonationContextType = {
    donations,
    loading,
    makeDonation,
    getDonationsForRequest,
    getTotalDonated,
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};
