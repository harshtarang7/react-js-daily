import { useState } from "react"

const useProducts = ()=>{
     const [products,setProducts] = useState()

     const getProducts = async()=>{
        try {
            const response = fetch('https://dummyjson.com/products').then(res=>res.json())
            console.log(response)
        } catch (error) {
            
        }
     }
     return {
        products,
        getProducts
     }
}

export {useProducts}