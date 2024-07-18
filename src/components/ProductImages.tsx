'use client'
import Image from 'next/image'
import React, { useState } from 'react'


const ProductImages = ({images} : {items:any}) => {
    
    const [index, setIndex] = useState(0)

    return (
        <div>
            <div className="h-[500px] relative">
                <Image src={images[index].image?.url} className='object-cover rounded-md' fill alt='' sizes='50vw' />
            </div>

            <div className='flex gap-4'>
                {
                    images.map((image:any,index:number) => (
                        <div onClick={() => setIndex(index)} className="cursor-pointer relative w-1/4 h-32 gap-4 mt-8" key={image._id}>
                            <Image src={image?.image.url} className='rounded-md object-cover' alt='' sizes='30vw' fill />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductImages