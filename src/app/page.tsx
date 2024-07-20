import CategoryList from "@/components/CategoryList"
import NewList from "@/components/NewList"
import ProductList from "@/components/ProductList"
import Slider from "@/components/Slider"
import { Suspense, useContext, useEffect } from "react"
import { wixClientContext } from "./context/wixContext"
import { useWixClient } from "./hooks/useWixClient"
import { wixClientServer } from "@/lib/wixClientServer"
import Skeleton from "@/components/Skeleton"

const HomePage =async () => {
  // const wixClient = useWixClient()
  
  // useEffect(() => {
  //   async function getProducts() {
  //     const res = await wixClient.products.queryProducts().find();
      
  //   }
  //   getProducts()
  // },[wixClient])
  
  
  return (
    <div className=''>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:pz-64">
        <h1 className="text-2xl">Feature Products</h1>
       <Suspense fallback={<Skeleton />}>
       <ProductList categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!} limit={4}/>
       </Suspense>
      </div>
      <div className="mt-24 ">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:32 2xl:pz-64">Categories</h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:pz-64">
        <h1 className="text-2xl">New Products</h1>
        {/* <ProductList /> */}
      </div>
    </div>
  )
}

export default HomePage