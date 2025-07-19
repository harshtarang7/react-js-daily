import { Box, Button, Grid, Typography } from "@mui/material";
import useTicTacToe from "../customHook/TicTacToe";

export const TicTacToe:React.FC = () => {
  const {
    board,
    handleClick,
    calculateWinner,
    resetGame,
    getStatusMessage,
  } = useTicTacToe();
  return (
    // game
    <div
      style={{
        maxWidth: "calc(3*100px)",
        margin: "5rem auto",
        textAlign: "center",
        padding: "22px",
        border: "1px solid black",
      }}
    >
      {/* status */}
      <Box
        sx={{
          fontSize: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography>{getStatusMessage()}</Typography>
        <Button
          onClick={resetGame}
          variant="contained"
          color={"secondary"}
          size={"small"}
        >
          Reset Game
        </Button>
      </Box>

      {/* board */}
      <Grid
       container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "4px",
          justifyContent: "center",
          maxWidth: "252px", 
          margin: "0 auto",
        }}
      >
        {board.map((b, index) => {
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
                  color: "black",
                },
              }}
              onClick={()=>handleClick(index)}
              disabled={b !== null} 
            >
              {b}
            </Button>
          );
        })}
      </Grid>
    </div>
  );
};
