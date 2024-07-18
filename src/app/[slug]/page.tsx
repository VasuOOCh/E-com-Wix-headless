import Add from '@/components/Add'
import CustomizeProduct from '@/components/CustomizeProduct'
import ProductImages from '@/components/ProductImages'
import { wixClientServer } from '@/lib/wixClientServer'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

const Product = async ({ params }: { params: { slug: string } }) => {

    const wixClient = await wixClientServer()
    const product = (await wixClient.products.queryProducts().eq("slug", params.slug).find()).items[0];

    if (!product) {
        return notFound()
    }

    return (
        <div className='px-4 md:px-8 lg:px-16 xl:32 2xl:pz-64 realtive flex flex-col lg:flex-row gap-16'>
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductImages images={product.media?.items} />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className='text-4xl font-medium'>
                    {product.name}
                </h1>
                <p className='text-gray-500'>{product.description}</p>
                <div className="h-[2px] bg-gray-500" />
                <div className='flex items-center gap-4'>
                    {
                        product.priceData?.price === product.priceData?.discountedPrice ? (

                            <h2 className='font-medium text-2xl'>{product.priceData?.currency} {product.priceData?.price}</h2>
                        ) : (
                            <>
                                <h3 className='text-xl text-gray-500 line-through'>{product.priceData?.currency} {product.priceData?.discountedPrice}</h3>
                                <h2 className='font-medium text-2xl'>{product.priceData?.currency} {product.priceData?.price}</h2></>
                        )
                    }
                </div>

                <CustomizeProduct productId={product._id} variants={product.variants} productOptions={product.productOptions} />
                <Add />
                <div className="h-[2px] bg-gray-500" />
                {
                    product.additionalInfoSections?.map((info: any, index: number) => (
                        <div key={index} className="text-sm">
                            <h4 className='font-medium mb-4'>{info.title}</h4>
                            <p>{info.description}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Product