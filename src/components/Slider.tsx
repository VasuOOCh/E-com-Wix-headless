'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


const slides = [
    {
        id: 1,
        title: "Summer Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
    },
    {
        id: 2,
        title: "Winter Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-pink-50 to-blue-50",
    },
    {
        id: 3,
        title: "Spring Sale Collections",
        description: "Sale! Up to 50% off!",
        img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
        url: "/",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
    },
];

const Slider = () => {
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
          setCurrent((prevCurrent) => (prevCurrent + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
      
        return () => clearInterval(timer);
      }, []);

    return (
        <div className='h-[calc(100vh-80px)] overflow-hidden '>
            <div className="w-max flex h-full transition-all ease-in-out duration-1000 relative" style={{
                transform : `translateX(-${current*100}vw)`
            }}>
                {
                    slides.map((slide) => (
                        <div key={slide.id} className={`${slide.bg} w-screen h-full flex flex-col gap-16 lg:flex-row`}>
                            <div className="h-1/2 lg:h-full w-1/2 flex items-center justify-center gap-8 flex-col text-center  ">
                                <h2 className='text-xl lg:3xl 2xl:text:5xl'>{slide.description}</h2>
                                <h1 className="text-5xl lg: text-6xl font-semibold">{slide.title}</h1>
                                <Link href={slide.url}>
                                    <button className='rounded-md bg-black text-white py-3 px-4'>Shop Now</button>
                                </Link>
                            </div>
                            <div className=" h-1/2 lg:h-full w-1/2 relative">
                                <Image className='object-cover' sizes='100%' alt='' src={slide.img} fill={true} />
                            </div>
                        </div>

                    ))
                }
            </div>
            <div className="absolute bottom-8 m-auto left-1/2 flex gap-3">
                {
                    slides.map((slide, index) => (
                        <div onClick={() => setCurrent(index)} className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex justify-center items-center ${current == index ? 'scale-150' : ''}`} key={slide.id}>
                            {current === index && (
                                <div className='w-[6px] h-[6px] bg-gray-600 rounded-full'></div>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Slider