import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
// import { checkAuth } from '../auth/auth';

interface User {
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoURL: string;
  uid: string;
}

const HomePage = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    console.log({ user });
    if (user) {
      setUser(user);
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, []);

  return (
    <div>
      <div>
        <h2>歡迎 {user?.displayName}來到芮芮代購</h2>
        <div>
          <img src='' alt='' />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
