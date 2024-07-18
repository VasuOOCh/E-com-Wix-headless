'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Menu = () => {
    const [open,setOpen] =useState(false)
    return (
    <div>
        <Image src={'/menu.png'} width={28} height={28} alt='' className='cursor-pointer' onClick={() => setOpen(!open)} />

        {open && (
            <div className='absolute flex flex-col gap-1 bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] justify-center items-center gap-8 text-xl z-10'>
                <Link href={''}>Home</Link> 
                <Link href={''}>Shops</Link> 
                <Link href={''}>Deals</Link> 
                <Link href={''}>About</Link> 
                <Link href={''}>Contact</Link> 
                <Link href={''}>Logout</Link> 
                <Link href={''}>Card(1)</Link> 
            </div>
        )}
    </div>
  )
}

export default Menu