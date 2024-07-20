import Filter from '@/components/Filter'
import ProductList from '@/components/ProductList'
import Skeleton from '@/components/Skeleton'
import { wixClientServer } from '@/lib/wixClientServer'
import { collections } from '@wix/stores'
import Image from 'next/image'
import React, { Suspense } from 'react'

const List =async ({searchParams} : {searchParams: any}) => {

  const wixClient =await wixClientServer()
  const id = (await wixClient.collections.getCollectionBySlug(searchParams?.cat || 'all-products')).collection?._id
  console.log(id);
  
  
  return (
    <div className='px-4 md:px-8 lg:px-16 xl:32 2xl:pz-64'>

      <div className=" hidden lg:flex bg-pink-200 justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className='text-4xl font-semibold leading-[48px] text-gary-700'>Grab upto 50% off</h1>
          <button className='bg-lama p-2 rounded-3xl text-white text-sm'>
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image fill className='object-contain' alt='' src={'/woman.png'} sizes='100%' />
        </div>
      </div>

    <Filter />

    <h1 className='text-xl mt-12 font-semibold'>{searchParams?.cat || "All Products"} for you</h1>
    <Suspense fallback={<Skeleton />}>
      <ProductList categoryId={id || '00000000-000000-000000-000000000001'} searchParams={searchParams}/>
    </Suspense>
    

    </div>
  )
}

export default List