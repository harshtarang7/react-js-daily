import { useEffect, useState } from "react"
import type { ProductListInterface } from "../types/types"


export interface productsInterface{
    products:ProductListInterface[],
    limit:number,
    skip:number,
    total:number
}
const useProducts = ()=>{
     const [products,setProducts] = useState<productsInterface>()

     const getProducts = async()=>{
        try {
            const response = await fetch('https://dummyjson.com/products')
            .then(res=>res.json())
            .then(data=>data)
            setProducts(response)
        } catch (error) {
            console.log(error)
        }
     }

     useEffect(()=>{
        getProducts()
     },[])
     return {
        products,
        
     }
}

export {useProducts}