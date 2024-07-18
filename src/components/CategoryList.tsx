import { wixClientServer } from '@/lib/wixClientServer'
import { log } from 'console'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryList =async () => {

    const wixClient =await wixClientServer()
    const cat =await wixClient.collections.queryCollections().find()
    // console.log(cat);
    
  return (
    <div className='px-4 overflow-x-scroll'>
        <div className="mt-8 flex gap-4 md:gap-8 scrollbar-hide">
            {
                cat.items.map((item) => (
                    <Link href={'/list?cat=' + item.slug} className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                <div className="relative bg-gray-600 w-full h-96">
                    <Image src={item.media?.mainMedia?.image?.url || '/product.png'} sizes='100%' alt='' fill={true} className='object-cover'  />
                </div>
                <h1 className='mt-8 font-light text-xl tracking-wide'>{item.name}</h1>
            </Link>
                ))
            }
            
        </div>
    </div>
    
  )
}

export default CategoryList