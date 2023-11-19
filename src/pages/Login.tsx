import facebook from '../assets/facebook.png';
import google from '../assets/google.png';
import apple from '../assets/apple.png';

// import mail from '../assets/mail.png';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// TODO: 添加Firebase Admin SDK 來驗證 ID token

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { signInWithEmail, signInWithGoogle, isAuthenticated } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log({ isAuthenticated });
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='flex flex-col lg:flex-row'>
      <div className='flex basis-1/3 justify-center content-center'>
        <img
          className='object-cover width-full h-auto'
          src='https://www.hdfcergo.com/images/default-source/travel-insurance/budget-shopping-destinations-around-the-world.jpg'
          alt=''
        />
      </div>
      <div className='flex flex-col basis-2/3 justify-center min-h-screen items-center'>
        <div className='flex flex-col justify-center px-3 py-3 w-full'>
          <div className='text-center sm:mb-3 lg:mb-6 sm:mx-auto sm:w-full sm:max-w-sm lg:w-full cursor-pointer text-lg lg:text-3xl'>
            登入
          </div>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm lg: w-full'>
            <form
              className='space-y-6'
              onSubmit={(e) => {
                e.preventDefault();
                signInWithEmail();
              }}
            >
              <div>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={email}
                  autoComplete='email'
                  placeholder='帳號 Email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  autoComplete='current-password'
                  placeholder='密碼 Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='text-xs lg:text-sm'>
                <a
                  href='#'
                  className='font-semibold text-teal-900 hover:text-teal-500 '
                >
                  忘記密碼?
                </a>
              </div>
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-teal-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  登入
                </button>
              </div>
            </form>

            <p className='mt-10 text-center text-sm text-teal-800'>
              尚未成為會員?
              <Link
                to='/register'
                className='font-semibold leading-6 text-teal-900 hover:text-teal-500'
              >
                {' '}
                點此註冊
              </Link>
            </p>
          </div>
        </div>
        <div>
          <h1 className='text-center text-xl p-4 mb-1 '>
            或以下列方式快速登入
          </h1>
          <div className='flex flex-row gap-8 justify-center content-center'>
            <div className='flex flex-col items-center gap-1 cursor-pointer'>
              <button onClick={handleSignInWithGoogle}>
                <img
                  className='rounded-lg w-14 h-14 p-2 ring-2 ring-gray-100'
                  src={google}
                  alt='google'
                />
              </button>
              <h4 className='text-gray-600'>Google</h4>
            </div>
            <div className='flex flex-col items-center gap-1 cursor-pointer'>
              <img
                className='rounded-lg w-14 h-14 p-2 ring-2 ring-gray-100'
                src={facebook}
                alt='facebook'
              />
              <h4 className='text-gray-600'>Facebook</h4>
            </div>
            <div className='flex flex-col items-center gap-1 cursor-pointer'>
              <img
                className='rounded-lg w-14 h-14 p-2 ring-2 ring-gray-100'
                src={apple}
                alt='apple'
              />
              <h4 className='text-gray-600'>Apple</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
