import Image from "next/image";
import React from "react";

const CartModal = () => {
    const cartIems = true;
    return (
        <div className="absolute p-4 rouned-md shadow-lg bg-white top-10 right-0 flex flex-col gap-6 z-20 w-max">
            {!cartIems ? (
                <div>Cart is empty</div>
            ) : (
                <div className="">
                    <h1 className="text-xl my-2">Shopping Cart</h1>
                    <div className="flex flex-col gap-8">
                        {/* Item */}

                        <div className="flex gap-4 ">
                            <Image
                                src={
                                    "https://images.pexels.com/photos/9130798/pexels-photo-9130798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                }
                                alt=""
                                height={96}
                                width={72}
                                className="object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-between items-center w-full">
                                <div className="w-full">
                                    <div className="flex items-center justify-between gap-8">
                                        <h3 className="font-semibold">Product Name</h3>
                                        <div className="p-1 bg-gray-100 rounded-md">$49</div>
                                    </div>
                                    <div className="">available</div>
                                </div>
                                <div className="flex w-full items-center justify-between text-sm ">
                                    <span className="text-gray-500">Qty. 2</span>
                                    <span className="text-blue-500">Remove</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 ">
                            <Image
                                src={
                                    "https://images.pexels.com/photos/9130798/pexels-photo-9130798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                }
                                alt=""
                                height={96}
                                width={72}
                                className="object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-between items-center w-full">
                                {/* top */}
                                <div className="w-full">
                                    <div className="flex items-center justify-between gap-8">
                                        <h3 className="font-semibold">Product Name</h3>
                                        <div className="p-1 bg-gray-100 rounded-md">$49</div>
                                    </div>
                                    <div className="">available</div>
                                </div>
                                {/* bottom */}
                                <div className="flex w-full items-center justify-between text-sm ">
                                    <span className="text-gray-500">Qty. 2</span>
                                    <span className="text-blue-500">Remove</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-0 mt-2">
                        <div className="flex items-center justify-between font-semibold">
                            <span className="">Subtotal</span>
                            <span className="">$49</span>
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
