import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import type { FundRequest } from '../types';
import { useAuth } from './AuthContext';

interface FundRequestContextType {
  fundRequests: FundRequest[];
  loading: boolean;
  createFundRequest: (request: Omit<FundRequest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateFundRequest: (id: string, updates: Partial<FundRequest>) => Promise<void>;
  deleteFundRequest: (id: string) => Promise<void>;
  getFundRequest: (id: string) => Promise<FundRequest | null>;
  uploadDocument: (file: File, requestId: string) => Promise<string>;
  verifyRequest: (requestId: string) => Promise<void>;
}

const FundRequestContext = createContext<FundRequestContextType>({} as FundRequestContextType);

export const useFundRequests = () => {
  const context = useContext(FundRequestContext);
  if (!context) {
    throw new Error('useFundRequests must be used within a FundRequestProvider');
  }
  return context;
};

export const FundRequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fundRequests, setFundRequests] = useState<FundRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Real-time listener for fund requests
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'fundRequests'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests: FundRequest[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        requests.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
          deadline: data.deadline ? data.deadline.toDate() : undefined,
        } as FundRequest);
      });
      setFundRequests(requests);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const createFundRequest = async (requestData: Omit<FundRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) throw new Error('User must be authenticated');

    const request: Omit<FundRequest, 'id'> = {
      ...requestData,
      userId: currentUser.uid,
      currentAmount: 0,
      status: 'active',
      isVerified: false,
      verificationCount: 0,
      documents: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'fundRequests'), {
      ...request,
      createdAt: Timestamp.fromDate(request.createdAt),
      updatedAt: Timestamp.fromDate(request.updatedAt),
      deadline: request.deadline ? Timestamp.fromDate(request.deadline) : null,
    });

    return docRef.id;
  };

  const updateFundRequest = async (id: string, updates: Partial<FundRequest>) => {
    const requestRef = doc(db, 'fundRequests', id);
    await updateDoc(requestRef, {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  };

  const deleteFundRequest = async (id: string) => {
    await deleteDoc(doc(db, 'fundRequests', id));
  };

  const getFundRequest = async (id: string): Promise<FundRequest | null> => {
    const docRef = doc(db, 'fundRequests', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        deadline: data.deadline ? data.deadline.toDate() : undefined,
      } as FundRequest;
    }
    return null;
  };

  const uploadDocument = async (file: File, requestId: string): Promise<string> => {
    const storageRef = ref(storage, `documents/${requestId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const verifyRequest = async (requestId: string) => {
    if (!currentUser) throw new Error('User must be authenticated');
    
    const request = fundRequests.find(r => r.id === requestId);
    if (!request) throw new Error('Request not found');

    await updateFundRequest(requestId, {
      verificationCount: request.verificationCount + 1,
      isVerified: request.verificationCount + 1 >= 3, // Require 3 verifications
    });
  };

  const value: FundRequestContextType = {
    fundRequests,
    loading,
    createFundRequest,
    updateFundRequest,
    deleteFundRequest,
    getFundRequest,
    uploadDocument,
    verifyRequest,
  };

  return (
    <FundRequestContext.Provider value={value}>
      {children}
    </FundRequestContext.Provider>
  );
};
