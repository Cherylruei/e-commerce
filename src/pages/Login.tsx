import facebook from '../assets/facebook.png';
import google from '../assets/google.png';
import apple from '../assets/apple.png';
import mail from '../assets/mail.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignInThirdParty from '../components/SignInThirdParty';

function Login() {
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  // 定義一個點擊處理函式，用來切換 showEmailLogin 的狀態
  const handleEmailLogin = () => {
    setShowEmailLogin(!showEmailLogin);
  };
  return (
    <div className='flex justify-center min-h-screen items-center'>
      {showEmailLogin ? (
        <div className='flex flex-col justify-center px-3 py-3'>
          <div className='cursor-pointer' onClick={handleEmailLogin}>
            返回
          </div>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm lg: w-full'>
            <form className='space-y-6' action='#' method='POST'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  帳號 Email
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    密碼 Password
                  </label>
                  <div className='text-sm'>
                    <a
                      href='#'
                      className='font-semibold text-teal-900 hover:text-teal-500'
                    >
                      忘記密碼?
                    </a>
                  </div>
                </div>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
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
      ) : (
        <div>
          <h1 className='text-center text-2xl p-4 mb-1 '>快速登入</h1>
          <div className='flex sm:flex-row lg:flex-col gap-4'>
            <SignInThirdParty image={google} content='使用 Google 帳號登入' />
            <SignInThirdParty
              image={facebook}
              content='使用 Facebook 帳號登入'
            />
            <SignInThirdParty image={apple} content='使用 Apple 帳號登入' />
            <SignInThirdParty
              image={mail}
              content=' 使用 電子郵件 登入'
              onClickAction={handleEmailLogin}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
