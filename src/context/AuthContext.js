"use client"
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const loggedIn = localStorage.getItem('isAuthenticated');
    if (loggedIn) {
      setIsAuthenticated(true);
    } else {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    router.push('/'); // Redirect to the home page after login
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/login'); // Redirect to the login page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
