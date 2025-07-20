import { useContext, useEffect } from "react";
import { cartContext } from "./CartContext";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const Cart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useContext must be used within a Provider");
  }
  const { cart, setCart } = context;

  // will check with the id of the product and update the quantity
  const handleQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const value = Number(e.target.value);

    if (value < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: value } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart)
  };

  // fetch from the local storage
  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      const parsedCart = JSON.parse(cartItems);
      setCart(parsedCart);
    }
  }, []);

  return (
    <Box mt={"3rem"} maxWidth={"1320px"}>
      {cart && (
        <>
          <Table
            sx={{
              border: "1px solid lightgray",
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  border: "2px solid #898989ff",
                  borderBottom: 0,
                }}
              >
                <TableCell
                  sx={{
                    borderRight: "2px solid #898989ff",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "2px solid #898989ff",
                  }}
                >
                  Image
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "2px solid #898989ff",
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "2px solid #898989ff",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "2px solid #898989ff",
                  }}
                >
                  Discount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((product, index) => {
                return (
                  <TableRow
                    sx={{
                      border: "2px solid #898989ff",
                      borderBottom: 0,
                      "& td": {
                        padding: "0px 8px",
                        height: "15px",
                        color:
                          index % 2 === 1
                            ? "white !important"
                            : "black !important",
                      },
                      backgroundColor: index % 2 === 0 ? "#ccc" : "#545454ff",
                    }}
                  >
                    <TableCell
                      sx={{
                        borderRight: "2px solid #898989ff",
                      }}
                    >
                      {product.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "2px solid #898989ff",
                      }}
                    >
                      <img
                        src={product.images[0]}
                        alt="products"
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "2px solid #898989ff",
                      }}
                    >
                      <input
                        type="number"
                        value={product.quantity || 1}
                        onChange={(e) => handleQuantity(e, product.id)}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "2px solid #898989ff",
                      }}
                    >
                      {(product.quantity || 1) * product.price} Rs
                    </TableCell>
                    <TableCell
                      sx={{
                        borderRight: "2px solid #898989ff",
                      }}
                    >
                      {product.discountPercentage} %
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Box
            mt={3}
            display={"flex"}
            justifyContent={"flex-end"}
            flexDirection={"column"}
            textAlign={"right"}
          >
            <Typography>
              Discount: -
              {cart
                .reduce((total, product) => {
                  const itemPrice = (product.quantity || 1) * product.price;
                  return total + (itemPrice * product.discountPercentage) / 100;
                }, 0)
                .toFixed(2)}
              Rs
            </Typography>

            <Typography>
              
              Total Rs :
              {cart
                .reduce((total, product) => {
                  const quantity = product.quantity || 1;
                  const originalItemTotal = product.price * quantity;
                  const discountAmount = originalItemTotal * (product.discountPercentage / 100);
                  return total + (originalItemTotal - discountAmount);
                }, 0)
                .toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
