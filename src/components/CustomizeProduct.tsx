'use client'
import { products } from '@wix/stores';
import React, { useEffect, useState } from 'react'
import Add from './Add';

const CustomizeProduct = ({ productId, variants, productOptions }: { productId: string, variants: products.Variant[], productOptions: products.ProductOption[] }) => {
  // console.log(variants);

  // console.log(productOptions);
  const [selectedOptions, setSelectedOptions] = useState<{[key: string] : string}>({});
  const [selectedVariant,setSelectedVariant] = useState<products.Variant>();

  const handleOptionsSelect = (optionType: string, choice: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }))
  }

  useEffect(()=>{
    const variant = variants.find((v) => {
      const variaantChoices = v.choices;
      if(!variaantChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key,value]) => variaantChoices[key] == value
      );
    } )
    if(variant) setSelectedVariant(variant)
  },[selectedOptions])

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) {
        return false

      }


      return Object.entries(choices).every(
        ([key, value]) =>
          variantChoices[key] === value
          && variant.stock?.inStock && variant.stock.quantity > 0

      )
    })
  }

  return (
    <div className='flex flex-col gap-6'>

      {
        productOptions.map((option) => (
          <div className="flex flex-col gap-4" key={option.name}>
            <h4>Choose a {option.name}</h4>
            <ul className="flex items-center gap-3">
              {
                option.choices?.map((choice) => {
                  const disabled = !isVariantInStock({ ...selectedOptions, [option.name!]: choice.description! })
                  const selected = selectedOptions[option.name] === choice.description;

                  const clickHandler = disabled
                    ? undefined
                    : () => handleOptionsSelect(option.name!, choice.description!);
                  return (
                    option.name == 'Color' ?
                      (
                        <li key={choice.value} className='w-8 h-8 ring-gray-300 relative rounded-full ring-1' style={{ backgroundColor: choice.value, cursor: disabled ? "not-allowed" : 'pointer' }} onClick={clickHandler}>
                          {
                            selected && <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                          }
                          {
                            disabled && <div className='absolute w-10 h-1 rounded-full bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
                          }
                        </li>
                      ) :
                      (
                        <li key={choice.value} className='ring-1 ring-lama rounded-md py-1 px-4 text-sm ' onClick={clickHandler} style={{
                          cursor: disabled ? "not-allowed" : 'pointer',
                          backgroundColor: selected ? '#f35c7a' : disabled ? '#FBCFEB' : 'white',
                          color: selected || disabled ? 'white' : '#f35c7a'
                        }}>{
                            choice.value
                          }</li>
                      )
                  )
                })
              }
            </ul>
          </div>
        ))
      }
      <Add productId={productId} variantId={selectedVariant?._id || variants[0]._id} stockNumber={selectedVariant?.stock?.quantity || 0}/>
    </div >
  )
}

export default CustomizeProduct