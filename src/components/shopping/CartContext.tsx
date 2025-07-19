import { Box } from "@mui/material";
import { createContext, useState, type ReactNode} from "react";

type CartItem = any;

type CartContextType = {
    cart:CartItem[];
    setCart:React.Dispatch<React.SetStateAction<CartItem[]>>;
}

let cartContext = createContext<CartContextType|undefined>(undefined);

type MainContextProps = {
  children: ReactNode;
};

export default function MainContext({children }:MainContextProps) {
    let[cart,setCart] = useState<CartItem[]>([])
    return(
        <Box>
            <cartContext.Provider value={{cart,setCart}}>
            {children}
            </cartContext.Provider>
        </Box>
    )
}

export {cartContext}