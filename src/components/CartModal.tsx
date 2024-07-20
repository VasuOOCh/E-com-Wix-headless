import { useCartStore } from "@/app/hooks/useCartStore";
import { useWixClient } from "@/app/hooks/useWixClient";
import Image from "next/image";
import React, { useEffect } from "react";
import {media as wixMedia} from '@wix/sdk'

const CartModal = () => {
    const {cart,removeItem,isLoading} = useCartStore()
    const wixClient = useWixClient()

    
    return (
        <div className="absolute p-4 rouned-md shadow-lg bg-white top-10 right-0 flex flex-col gap-6 z-20 w-max">
            {isLoading? "Loading..." : 
             !cart.lineItems ? (
                <div>Cart is empty</div>
            ) : (
                <div className="">
                    <h1 className="text-xl my-2">Shopping Cart</h1>
                    <div className="flex flex-col gap-8">
                        {/* Item */}

                        {
                            cart.lineItems.map((item) => (<div key={item._id} className="flex gap-4 ">
                                {
                                    item.image ? (
                                        <Image
                                    src={
                                        wixMedia.getScaledToFillImageUrl(item.image, 72,96, {})
                                    }
                                    alt=""
                                    height={96}
                                    width={72}
                                    className="object-cover rounded-md"
                                />
                                    ) : (
                                        null
                                    )
                                }
                                <div className="flex flex-col justify-between items-center w-full">
                                    <div className="w-full">
                                        <div className="flex items-center justify-between gap-8">
                                            <h3 className="font-semibold">{item.productName?.original}</h3>
                                            <div className="p-1 bg-gray-100 rounded-md flex gap-2">
                                            {item.quantity && item.quantity > 1 && <div className="text-sm  text-blue-500">{item.quantity} x </div>}
                                              $ {item.price?.amount}
                                               </div>
                                        </div>
                                        <div className="">{item.availability ? "available" : "not available"}</div>
                                    </div>
                                    <div className="flex w-full items-center justify-between text-sm ">
                                        <span className="text-gray-500">Qty. {item.quantity}</span>
                                        <span className="text-blue-500 cursor-pointer" onClick={() => removeItem(wixClient, item._id!)}>Remove</span>
                                    </div>
                                </div>
                            </div>))
                        }
                        
                    </div>
                    <div className="flex flex-col gap-0 mt-2">
                        <div className="flex items-center justify-between font-semibold">
                            <span className="">Subtotal</span>
                            <span className="">$ {cart?.subtotal?.amount || 0}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">
                            Shipping and taxes and calculated at checkout.
                        </p>
                        <div className="flex justify-between text-sm">
                            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">View Cart</button>
                            <button className="rounded-md py-3 px-4 ring-1 ring-gray-300 text-white bg-black">Checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartModal;
