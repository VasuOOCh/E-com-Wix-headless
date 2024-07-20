import { wixClientServer } from '@/lib/wixClientServer';
import { products } from '@wix/stores';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DOMPurify from "isomorphic-dompurify";
import Pagination from './Pagination';

const ProductList = async ({ categoryId, limit, searchParams }: { categoryId: string; limit?: number, searchParams: any }) => {

  const pageLimit = limit || 8
  const wixClient = await wixClientServer()
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith('name', searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome('productType', searchParams?.type ? [searchParams?.type] : ['physical', 'digital'])
    .gt('priceData.price',searchParams?.min || 0)
    .lt('priceData.price',searchParams?.max || 9999999)
    .limit(pageLimit)
    .skip(parseInt(searchParams?.page)*pageLimit || 0)
    // .find()

    if(searchParams?.sort) {
      const [sortType,sortBy] = searchParams.sort.split(' ')
      
      if(sortType === 'asc') {
        productQuery.ascending(sortBy)
      }
      if(sortType === 'desc') {
        productQuery.descending(sortBy)
      }
      
    }

    const resp = await productQuery.find()
    
    

  return (
    <div className='flex gap-x-8 gap-y-16 justify-center flex-wrap mt-12'>
      {
        resp.items.map((product: products.Product) => (
          <Link key={product._id} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]' href={'/' + product.slug}>
            <div className="relative w-full h-80">
              <Image alt='' fill={true} src={product?.media?.mainMedia?.image?.url || '/product.png'} sizes='25vw'
                className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500' />
              {
                product?.media?.items && <Image alt='' fill={true} src={product?.media?.items[1]?.image?.url || '/product.png'} sizes='25vw'
                  className='absolute object-cover rounded-md z-1' />
              }
            </div>

            <div className='flex justify-between'>
              <span className='font-medium'>{product.name}</span>
              <span className='font-semibold'>$ {product.priceData?.price}</span>
            </div>
            <div className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.additionalInfoSections?.find((section) => section.title == 'shortDesc')?.description || "") }}></div>
            <button className='w-max rounded-2xl ring-1 ring-lama py-2 px-4 text-xs hover:bg-lama hover:text-white'>
              Add to cart
            </button>
          </Link>
        ))
      }
      <Pagination currentPage={resp.currentPage || 0} hasPrev={resp.hasPrev()} hasNext={resp.hasNext()} />

    </div>
  )
}

export default ProductList