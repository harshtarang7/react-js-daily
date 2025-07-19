import { useState } from "react"
import { useProducts } from "../../customHook/Products"

export const Products:React.FC =()=>{
   const {products,getProducts} = useProducts()
   console.log(getProducts())

    return(
        <>
        products. page 
        </>
    )
}