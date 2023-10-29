import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleAuthProvider } from '../utils/firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  setUser: () => {},
  signInWithEmail: () => {},
  logout: () => {},
  signInWithGoogle: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const pathname = useLocation();
  const auth = getAuth();

  const signInWithGoogle = async () => {
    try {
      // Sign in with Google
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      // Get the ID token and user data
      const idToken = await userCredential.user.getIdToken();
      const userData = userCredential.user;
      // Set the ID token and user data in state
      setIsAuthenticated(true);
      setUser(userData);
      // Save the ID token and user data to local storage
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    const userData = JSON.parse(localStorage.getItem('user') || 'null');

    if (token && userData) {
      // Set the ID token and user data in state
      setIsAuthenticated(true);
      setUser(userData);
    } else {
      // Redirect to the login page
      navigate('/login');
    }
  }, [pathname, navigate]);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Get the ID token and user data
      const idToken = await userCredential.user.getIdToken();
      const userData = userCredential.user;
      // Set the ID token and user data in state
      setIsAuthenticated(true);
      setUser(userData);
      // Save the ID token and user data to local storage
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      // Sign out the user
      await auth.signOut();
      // Remove the ID token and user data from local storage
      localStorage.removeItem('idToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    setUser,
    signInWithEmail,
    logout,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
