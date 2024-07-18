import React from 'react'

const CustomizeProduct = ({productId, variants,productOptions} : {productId :any, variants:any,productOptions:any}) => {
  return (
    <div className='flex flex-col gap-6'>

      <h4>Choose a color</h4>
      <ul className="flex items-center gap-3">
        <li className='w-8 h-8 ring-gray-300 relative rounded-full ring-1 bg-red-600'>
          <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </li>
        <li className='w-8 h-8 ring-gray-300 relative rounded-full ring-1 bg-blue-600'>
        </li>
        <li className='w-8 h-8 ring-gray-300 relative rounded-full ring-1 bg-green-600 cursor-not-allowed'>
        <div className='absolute w-10 h-1 rounded-full bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </li>
      </ul>

      <h4>Choose a size</h4>
      <ul className="flex items-center gap-3">
        <li className='ring-1 ring-lama rounded-md py-1 px-4 text-sm cursor-pointer'>small</li>
        <li className='ring-1 ring-lama rounded-md py-1 px-4 text-sm cursor-pointer text-white bg-lama'>medium</li>
        <li className='ring-1 ring-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed bg-pink-200 text-white'>large</li>
      </ul>
    </div>
  )
}

export default CustomizeProduct