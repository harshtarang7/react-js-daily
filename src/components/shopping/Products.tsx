import { useContext } from "react";
import { useProducts } from "../../customHook/Products";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { cartContext } from "./CartContext";
import type { ProductListInterface } from "../../types/types";
import { Link } from "react-router-dom";

export const Products: React.FC = () => {
  const { products } = useProducts();
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  const { cart, setCart } = context;
  console.log('cart',cart)

  const addtoCart = (product: ProductListInterface) => {
    const existingItem = cart.find(item=>item.id === product.id)
    if(existingItem){
        
       const updatedCart=cart.map(item=>
            item.id === product.id
            ?{...item,quantity:item.quantity+1}
            :item
        );
        setCart(updatedCart)
        localStorage.setItem('cart',JSON.stringify(updatedCart))

    }else{
        const newCart = [...cart,{...product,quantity: 1 }]
        setCart(newCart);
        localStorage.setItem('cart',JSON.stringify(newCart))
    }
  };

  return (
    <Box
      mt={"3rem"}
      sx={{
        maxWidth: "1320px",
        textAlign: "right",
      }}
    >
        <Link to={'/cart'}>
      <Button
        variant="contained"
        sx={{
          position: "relative",
          my: 2,
        }}
      >
        Cart
        <sup
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 20,
            height: 20,
            color: "white",
            borderRadius: 30,
            backgroundColor: "red",
          }}
        >
          1
        </sup>
      </Button>
      </Link>
      <Grid container spacing={3}>
        {products?.products.map((product, index) => {
          return (
            <Grid size={{ lg: 3 }} key={index} textAlign={"start"}>
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <img src={product.images[0]} width={"30%"} />
                <Typography fontWeight={600}>{product.title}</Typography>
                <Typography
                  component={"span"}
                  fontSize={13}
                  color="textSecondary"
                >
                  {product.description.slice(0, 70) + "..."}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ width: "70%", fontSize: "14" }}
                  onClick={() => addtoCart(product)}
                >
                  Add to Cart
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
