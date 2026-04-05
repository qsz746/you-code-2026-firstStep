import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userRole: 'coordinator' | 'volunteer' | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<'coordinator' | 'volunteer' | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const loadUserRole = async () => {
        if (!user) {
          setUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }

        setUser(user);
        console.log('User UID:', user.uid); // Debug: show the UID

        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          console.log('Firestore doc exists:', userDoc.exists()); // Debug: check if doc found
          console.log('Firestore doc data:', userDoc.data()); // Debug: show the data

          if (userDoc.exists()) {
            const data = userDoc.data() as { role?: string };
            console.log('User role:', data.role); // Debug: show the role
            setUserRole(data.role === 'volunteer' ? 'volunteer' : data.role === 'coordinator' ? 'coordinator' : null);
          } else {
            console.warn('No Firestore document found for user:', user.uid); // Debug: document not found
            setUserRole(null);
          }
        } catch (error) {
          console.error('Failed to load user role from Firestore:', error);
          setUserRole(null);
        }

        setLoading(false);
      };

      loadUserRole();
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    userRole,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
