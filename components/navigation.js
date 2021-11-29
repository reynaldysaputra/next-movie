import FilmSvg from '../components/svg/film';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import MenuSvg from '../components/svg/menu';
import { useState } from 'react';

export default function Headers(){
  const {pathname} = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return(
    <nav className='bg-gray-300'>
      <div className='py-8 flex justify-between items-center container mx-auto  px-4 lg:px-0'>
        <div>
          <Link href='/'>
            <a className='flex items-center'>
              <FilmSvg/>
              <h2 className='ml-3 text-xl font-bold'>Next Movies</h2>
            </a>
          </Link>
        </div>
        <MenuSvg className={'lg:hidden block relative'} onClick={() => setIsOpen(!isOpen)} />
        <div 
          className={`flex lg:space-x-4 flex-col lg:flex-row fixed w-[80%] h-full justify-center items-center space-y-5 bottom-0 bg-black lg:bg-transparent lg:static  ${isOpen ? 'right-0' : 'right-[-100%]'} transition-all lg:justify-end lg:items-start lg:space-y-0`}
        >
          <div 
            className='absolute lg:hidden top-5 right-8 text-2xl text-white cursor-pointer'
            onClick={() => setIsOpen(false)}
          >X</div>
          <Link href='/about'>
            <a 
              className={`${pathname === '/about' ? 'text-yellow-500' : 'text-blue-600'} text-2xl lg:text-sm`} 
              onClick={() => setIsOpen(false)} 
            >About</a>
          </Link>
          <Link href='/contact'>
            <a 
              className={`${pathname === '/contact' ? 'text-yellow-500' : 'text-blue-600'} text-2xl lg:text-sm`} 
              onClick={() => setIsOpen(false)} 
            >Contact</a>
          </Link>
          <Link href='/blog'>
            <a 
              className={`${pathname === '/blog' ? 'text-yellow-500' : 'text-blue-600'} text-2xl lg:text-sm`} 
              onClick={() => setIsOpen(false)} 
            >Blog</a>
          </Link>
        </div>
      </div>
    </nav>
  )
}