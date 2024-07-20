'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Pagination = ({currentPage, hasPrev,hasNext} : {currentPage: number, hasPrev:  number,hasNext : number}) => {
    const pathName = usePathname()
        const searchParams = useSearchParams()
        const {replace} = useRouter()

    const updatePageUrl = (pageNumber : number) => {
        const params =new URLSearchParams(searchParams)  
        params.set("page", pageNumber.toString())
        replace(`${pathName}?${params.toString()}`)
    }

  return (
    <div className='flex justify-between w-full'>
        <button disabled={!hasPrev} onClick={() => updatePageUrl(currentPage-1)} className='bg-lama text-sm roundeed-md text-white p-2 w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200'>
            Previous
        </button>
        <button disabled={!hasNext} onClick={() => updatePageUrl(currentPage + 1)} className='bg-lama text-sm roundeed-md text-white p-2 w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200'>
            Next
        </button>
    </div>
  )
}

export default Pagination