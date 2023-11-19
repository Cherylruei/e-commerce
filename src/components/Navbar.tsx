import { useState } from 'react';
import logo from '../assets/rueishop_logo.png';
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

interface NavbarProps {
  user: {
    displayName: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: string;
    uid: string;
  } | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseBtn = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex flex-row justify-between items-center w-full my-2'>
      {/* logo 區塊 */}
      <div className='w-1/2 flex flex-row items-center mx-1 lg:w-1/4 gap-4'>
        <div className='w-24 h-24 flex justify-center items-center lg:w-12 lg:h-12 border-r-1 rounded-full'>
          <img className='object-cover' src={logo} alt='' />
        </div>
        <div className='flex flex-wrap content-center'>
          <h2 className='text-2xl lg:text-xl font-mono'>Ruei's SHOP</h2>
        </div>
      </div>

      {/* 中間的 a 連結 */}
      <div className='hidden lg:flex flex-row justify-center items-center w-1/2'>
        <a className='p-3 text-sm' href=''>
          商品分類
        </a>
        <a className='p-3 text-sm' href=''>
          快閃連線
        </a>
        <a className='p-3 text-sm' href=''>
          闆闆推薦
        </a>
        <a className='p-3 text-sm' href=''>
          我的訂單
        </a>
        <a className='p-3 text-sm' href=''>
          會員專區
        </a>
      </div>

      <div className='w-1/2 flex flex-row justify-end items-center gap-1 lg:w-1/4 lg:gap-6 z-0'>
        <div>
          <FaSearch className='text-2xl cursor-pointer lg:text-lg' />
        </div>
        <div>
          <a href=''>
            <FaShoppingCart className='text-2xl cursor-pointer lg:text-lg' />
          </a>
        </div>

        <div className=''>
          {/* hamburger menu*/}
          <div
            className={`${isOpen ? 'hidden' : 'block'}
            flex flex-row justify-between items-center h-16 bg-white text-black shadow-sm font-mono lg:hidden`}
            role='navigation'
          >
            <div
              className='px-2 cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className='w-10 h-10'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='3'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </div>
          </div>
          {/* 點擊後出現的選單 mobile menu */}
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } lg:hidden w-72 h-96 flex flex-col justify-center items-center absolute top-0 right-0 bg-amber-50 rounded-lg text-black font-mono z-10`}
          >
            <div
              className='text-4xl cursor-pointer absolute top-1 right-1'
              onClick={handleCloseBtn}
            >
              <IoCloseSharp />
            </div>
            <div className='mt-7'>
              <div className='w-64 p-4 text-center border-black border-1'>
                <a
                  className='text-3xl block text-black font-mono cursor-pointer'
                  href='#'
                >
                  商品分類
                </a>
              </div>
              <div className='w-64 p-4 text-center '>
                <a
                  className='text-3xl block text-black font-mono cursor-pointer'
                  href='#'
                >
                  快閃連線
                </a>
              </div>
              <div className='w-64 p-4 text-center '>
                <a
                  className='text-3xl block text-black font-mono cursor-pointer'
                  href='#'
                >
                  闆闆推薦
                </a>
              </div>
              <div className='w-64 p-4 text-center '>
                <a
                  className='text-3xl block text-black font-mono cursor-pointer'
                  href='#'
                >
                  我的訂單
                </a>
              </div>
              <div className='w-64 p-4 text-center '>
                <a
                  className='text-3xl block text-black font-mono cursor-pointer'
                  href='#'
                >
                  會員專區
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
