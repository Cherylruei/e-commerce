import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
// import { checkAuth } from '../auth/auth';

interface User {
  displayName: string;
  email: string;
  lineID: string;
  emailVerified: boolean;
  phoneNumber: string;
  uid: string;
}

const HomePage = () => {
  const { user, setUser } = useAuth();
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log({ user });
    if (user) {
      setUser(user);
    } else {
      setUser(null);
      localStorage.removeItem('idToken');
    }
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <div className='border-2 border-black border-double'></div>
    </div>
  );
};

export default HomePage;
