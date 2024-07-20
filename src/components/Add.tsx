'use client'
import { useCartStore } from '@/app/hooks/useCartStore';
import { useWixClient } from '@/app/hooks/useWixClient';
import React, { useState } from 'react'

const Add = ({ productId, variantId, stockNumber }: { productId: string, variantId: string, stockNumber: number }) => {
  const wixClient = useWixClient()
  const [quantity, setQuantity] = useState(1);
  const {addItem} = useCartStore()

  function changeQuantity(val: string) {

    if (val == "inc") {
      if (quantity < stockNumber) {
        setQuantity((prev) => prev + 1)
      }
    } else {
      if (quantity != 1) {
        setQuantity((prev) => prev - 1)
      }
    }
  }


return (
  <div className='flex flex-col gap-4'>
    <h4 className='font-medium'>Choose a quantity</h4>

    <div className="flex justify-between">
      <div className="flex gap-4 items-center">
        <div className="flex bg-gray-100 py-2 px-4 rounded-3xl items-center justify-between w-32">
          <button onClick={() => changeQuantity('dec')} className='cursor-pointer text-xl'>-</button>
          {quantity}
          <button onClick={() => changeQuantity('inc')} className='cursor-pointer text-xl'>+</button>
        </div>

        {
          stockNumber < 1 ? (
            <div>Out of stock</div>
          ) : (
            <div className="">Only <span className="text-lama">{stockNumber} items</span> left! <br />
              Don't miss it
            </div>
          )
        }
      </div>

      <button className='w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-0' onClick={() => addItem(wixClient,productId, variantId, quantity)}>Add to cart</button>
    </div>
  </div>
)
}

export default Add