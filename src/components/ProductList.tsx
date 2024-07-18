import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DOMPurify from "isomorphic-dompurify";

const ProductList = async ({ categoryId, limit ,searchParams}: { categoryId: string; limit?: number ,searrchParams :any}) => {


  const wixClient = await wixClientServer()
  const resp = await wixClient.products.queryProducts().eq("collectionIds", categoryId).limit(limit || 20).find()
  


  return (
    <div className='flex gap-x-8 gap-y-16 justify-center flex-wrap mt-12'>
      {
        resp.items.map((product : products.Product) => (
          <Link key={product._id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]' href={'/' + product.slug}>
            <div className="relative w-full h-80">
              <Image alt='' fill={true} src={product?.media?.mainMedia?.image?.url || '/product.png'} sizes='25vw'
                className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
              {
                product?.media?.items && <Image alt='' fill={true} src={product?.media?.items[1]?.image?.url|| '/product.png'} sizes='25vw'
                className='absolute object-cover rounded-md z-1' />
              }
            </div>

            <div className='flex justify-between'>
              <span className='font-medium'>{product.name}</span>
              <span className='font-semibold'>$ {product.priceData?.price}</span>
            </div>
            <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(product.additionalInfoSections?.find((section) => section.title == 'shortDesc')?.description || "")}}></div>
            <button className='w-max rounded-2xl ring-1 ring-lama py-2 px-4 text-xs hover:bg-lama hover:text-white'>
              Add to cart
            </button>
          </Link>
        ))
      }



    </div>
  )
}

export default ProductList