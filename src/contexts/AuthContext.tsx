import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleAuthProvider, db } from '../utils/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { ReactNode } from 'react';

// firebase/firestore users是用來給客人修改會員資料，其他用途??
// production 設定
// If authenticated from firebase: Change allow read, write: if false; to request.auth != null;

// 假資料
const lineID: string = 'cherylruei';

interface User {
  displayName: string;
  email: string;
  lineID?: string;
  emailVerified: boolean;
  phoneNumber: string;
  uid: string;
}

const AuthContext = createContext({
  isAuthenticated: false,
  user: {
    displayName: '',
    email: '',
    lineID: '',
    emailVerified: false,
    phoneNumber: '',
    uid: '',
  },
  setUser: () => {},
  signInWithEmail: () => {},
  logout: () => {},
  signInWithGoogle: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
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
      // Save the user data to Firestore
      await setDoc(doc(db, 'users', userData.uid), {
        displayName: userData.displayName,
        email: userData.email,
        // 額外增加的欄位 lineID 要怎麼加入?
        // 假資料添加應由用戶輸入後將其保存 (添加到 firestore users collection)
        lineID: lineID,
        phoneNumber: userData.phoneNumber,
        photoURL: userData.photoURL,
        providerId: userData.providerId,
        uid: userData.uid,
      });
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
      // navigate('/login');
    }
  }, []);

  const signInWithEmail = async (
    email: string,
    password: string,
    lineID: string
  ) => {
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
      // Save the user data to Firestore
      // 密碼已經存在Firebase Auth, 其他 user資料存在 Firestore 資料庫
      await setDoc(doc(db, 'users', userData.uid), {
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        lineID: lineID,
      });
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
