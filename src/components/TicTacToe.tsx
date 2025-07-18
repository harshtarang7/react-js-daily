import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

const intialBoard = () => Array(9).fill(null);

export const TicTacToe = () => {
  const [board, setBoard] = useState(intialBoard);

  return (
    // game
    <div
      style={{
          maxWidth: "calc(3*100px)",
          margin: "5rem auto",
          textAlign: "center",
          padding: "22px",
          border:'1px solid black',
      }}
    >
      {/* status */}
      <Box
        sx={{
          fontSize: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems:'center',
          marginBottom: "20px",
        }}
      >
        <Typography> Player X turn</Typography>
        <Button variant="contained" color={'secondary'} size={'small'}>Reset Game</Button>
      </Box>

      {/* board */}
        <Grid
          sx={{
            gridTemplateColumns: "repeat (3, 1fr)",
            justifyContent: "center",
          }}
        >
          {board.map((_, index) => {
            return (
              <Button
                key={index}
                variant="contained"
                sx={{
                  backgroundColor: "gray",
                  width: "80px",
                  height: "80px",
                  fontSize: "32px",
                  border: "2px solid #ccc",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease-in-out",
                  ":hover": {
                    bgcolor: " #f0f0f0",
                    color:'black'
                  },
                }}
              >
                X
              </Button>
            );
          })}
        </Grid>
    </div>
  );
};
