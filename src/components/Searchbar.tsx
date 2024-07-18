'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const SearchBar = () => {
  const router= useRouter()
  const handleSearch = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as String;

    if(name) {
      router.push('/list?name' + name)
    }
  }
  return (
    <form onSubmit={handleSearch} className='flex gap-4 items-center justify-between bg-gray-100 p-2 rounded-md flex-1'>
      <input name='name' type="text" className='bg-inherit flex-1 outline-none' placeholder='search' />
      <button className='cursor-pointer'>
        <Image src={'/search.png'} alt={''} width={16} height={16} />
      </button>
    </form>
  )
}

export default SearchBar