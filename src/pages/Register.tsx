import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

// TODO 1:使用者輸入資料時，避免元件 re-render
interface User {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
}

const userObject: User = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
};

function Register() {
  const [user, setUser] = useState<User>(userObject);
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      console.log('User created successfully!');
      navigate('/login'); // 導航到 login 路徑
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log({ user });

  return (
    <div className='flex flex-col basis-2/3 justify-center min-h-screen items-center'>
      <div className='flex flex-col justify-center px-3 py-3 w-full'>
        <div className='text-center sm:mb-3 lg:mb-6 sm:mx-auto sm:w-full sm:max-w-sm lg:w-full cursor-pointer text-lg lg:text-3xl'>
          填寫以下資料註冊
        </div>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm lg: w-full'>
          <form
            className='space-y-6'
            onSubmit={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            <div>
              <Input
                id='email'
                name='email'
                type='email'
                autoComplete='off'
                placeholder='帳號 Email'
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='off'
                placeholder='密碼 Password'
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id='passwordConfirm'
                name='passwordConfirm'
                type='password'
                autoComplete='off'
                placeholder='確認密碼 Confirm Password'
                value={user.passwordConfirm}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id='name'
                name='name'
                type='name'
                autoComplete='off'
                placeholder='請輸入 Line 名稱'
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id='phone'
                name='phone'
                type='number'
                autoComplete='number'
                placeholder='請輸入手機號碼'
                value={user.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-teal-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                完成註冊
              </button>
            </div>
          </form>

          <p className='cursor-pointer mt-10 text-center text-sm text-teal-800'>
            <Link
              to='/login'
              className='font-semibold leading-6 text-teal-900 hover:text-teal-500'
            >
              {' '}
              按此返回登入頁面
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
