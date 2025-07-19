import { useState } from "react";
import { useProducts } from "../../customHook/Products";
import { Box, Card, Grid, Typography } from "@mui/material";

export const Products: React.FC = () => {
  const { products } = useProducts();
  console.log(products);

  return (
    <Grid container mt={'3rem'} spacing={3}>
      {products?.products.map((product, index) => {
        return (
          <Grid size={{ lg: 3 }} key={index} textAlign={'start'}>
            <Card sx={{width:'100%',height:'100%',p:2}}>
                <img src={product.images[0]} width={"30%"}/>
              <Typography fontWeight={600}>{product.title}</Typography>
              <Typography component={'span'} fontSize={13} color="textSecondary">{product.description.slice(0,70) +'...' }</Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
