import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:pz-64 bg-gray-100 text-sm mt-24'>

      <div className="flex flex-col justify-between gap-24 md:flex-row">

        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href={""}>
            <div className="text-2xl tracking-wide">LAMA</div>
          </Link>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit id commodi voluptatem quidem nulla eaque.</p>
          <span className='font-semibold'>hello@gmail.com</span>
          <span className='font-semibold'>234567890</span>
          <div className="flex gap-4">
            <Image src={'/facebook.png'} width={16} height={16} alt='' />
            <Image src={'/instagram.png'} width={16} height={16} alt='' />
            <Image src={'/youtube.png'} width={16} height={16} alt='' />
            <Image src={'/pinterest.png'} width={16} height={16} alt='' />
            <Image src={'/x.png'} width={16} height={16} alt='' />
          </div>
        </div>

        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className='font-medium text-lg'>Company</h1>
            <div className="flex flex-col gap-3">
            <Link href={''}>About</Link>
            <Link href={''}>Contacts</Link>
            <Link href={''}>Affilates</Link>
            <Link href={''}>Blog</Link>
            <Link href={''}>Contact us</Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h1 className='font-medium text-lg'>Shop</h1>
            <div className="flex flex-col gap-3">
            <Link href={''}>About</Link>
            <Link href={''}>Contacts</Link>
            <Link href={''}>Affilates</Link>
            <Link href={''}>Blog</Link>
            <Link href={''}>Contact us</Link>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h1 className='font-medium text-lg'>Help</h1>
            <div className="flex flex-col gap-3">
            <Link href={''}>About</Link>
            <Link href={''}>Contacts</Link>
            <Link href={''}>Affilates</Link>
            <Link href={''}>Blog</Link>
            <Link href={''}>Contact us</Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
        <h1 className="font-medium text-lg">
          SUBSCRIBE
        </h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam iure porro architecto cum recusandae doloribus!</p>
        <div className="flex">
          <input type="text" placeholder='Email' className='p-4 w-3/4' />
          <button className='w-1/4 bg-lama text-white'>JOIN</button>
        </div>
          <span className='font-semibold'>Secure Payments</span>
          <div className="flex justify-between">
            <Image src={'/discover.png'} alt='' width={40} height={20} />
            <Image src={'/skrill.png'} alt='' width={40} height={20} />
            <Image src={'/paypal.png'} alt='' width={40} height={20} />
            <Image src={'/mastercard.png'} alt='' width={40} height={20} />
            <Image src={'/visa.png'} alt='' width={40} height={20} />
          </div>
        </div>

      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">
        © VRC limited
        </div>
        <div className='flex flex-col items-center md:flex-row gap-4'>
        <div className='flex gap-2'>
          <span className="text-gary-500">
            Language
          </span>
          <span className='font-medium'>
            India | English
          </span>
        </div>
        <div className='flex gap-2'>
          <span className="text-gary-500">
            Currency
          </span>
          <span className='font-medium'>
            $ USD
          </span>
        </div>
        </div>
      </div>

    </div>
  )
}

export default Footer