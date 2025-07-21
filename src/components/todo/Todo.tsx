import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormLabel,
  FormHelperText,
} from "@mui/material";

import { useTodo } from "../../customHook/Todo";

export const Todo = () => {
  const {
    inputTask,
    priority,
    savedTask,
    handleAddTask,
    handlePriority,
    handleDelete,
    handleChecked,
    getPriorityColor,
    setInputTask,
    setPriority,
  } = useTodo();

  const todoTasks = savedTask.filter(task => task.category === "Todo");
  const activeTasks = savedTask.filter(task => task.category === "Active");  
  const completedTasks = savedTask.filter(task => task.category === "Completed");

  const renderTask = (tasks: any[], cardTitle: string, bgColor: string) => {
    if (!tasks || tasks.length === 0) {
      return (
        <Box
          sx={{
            width: "32%",
            minHeight: "200px",
            margin: "10px",
            backgroundColor: bgColor,
            p: 2,
            borderRadius: 2,
            border:1
          }}
        >
          <Typography fontWeight={600}>{cardTitle} ({tasks.length})</Typography>
          <Typography color="text.secondary" mt={2}>
            No tasks
          </Typography>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          width: "30%",
          minHeight: "200px",
          margin: "10px",
          backgroundColor: bgColor, 
          p: 0,
          borderRadius: 2,
          border:1
        }}
      >
        <Typography fontWeight={600}>
          {cardTitle} ({tasks.length})
        </Typography>
        {tasks.map((task) => {
          return (
            <Box
              sx={{
                p:1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #969696ff",
                my: 1,
                cursor:'move',
                border:1
              }}
              key={task.id}
            >
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  gap:1,
                }}
                
              >
                <TextField
                  onClick={() => handleChecked(task.id)}
                  type="checkbox"
                  sx={{ border: 0, width: "10%" }}
                  value={task.checked}
                />
                <Typography width={"60%"} textAlign={"start"} ml={1}>
                  {task.checked ? <del>{task.task}</del> : task.task}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <FormControl
                  size={"small"}
                  sx={{
                    minWidth: 100,
                  }}
                >
                  <Select
                    value={task.priority}
                    onChange={(e) =>
                      handlePriority(
                        task.id,
                        e.target.value as "high" | "medium" | "low"
                      )
                    }
                    sx={{
                      color: getPriorityColor(
                        task.priority as "high" | "medium" | "low"
                      ),
                      fontWeight: "bold",
                    }}
                  >
                    <MenuItem value="high" sx={{ color: "#ff4444" }}>
                      High
                    </MenuItem>
                    <MenuItem value="medium" sx={{ color: "#ff9900" }}>
                      Medium
                    </MenuItem>
                    <MenuItem value="low" sx={{ color: "#00aa00" }}>
                      Low
                    </MenuItem>
                  </Select>
                </FormControl>
                <Button onClick={() => handleDelete(task.id)}>
                  <Delete color="error" />
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        mt: 3,
      }}
    >
      <Typography variant="h5" color="initial">
        This is todo
      </Typography>

      <Box
        sx={{
          width: "70%",
          height: "10%",
          margin: "auto",
          display: "flex",
          gap: 1,
          px: 2,
        }}
      >
        <TextField
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          fullWidth
          size="small"
        />

        {/* priority */}
        <FormControl sx={{ width: "20%" }} size="small">
          <InputLabel>Priority</InputLabel>
          <Select
            id="demo-simple-select"
            value={priority}
            label="Age"
            onChange={(e) =>
              setPriority(e.target.value as "high" | "medium" | "low")
            }
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>
        </FormControl>

        {/* add task */}
        <Button
          variant="contained"
          sx={{ width: "30%" }}
          size="small"
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>

      {/* <Box
        sx={{
          width: "70%",
          height: "40%",
          margin: "auto",
          backgroundColor: " #e8df9eff",
          p: 2,
          borderRadius: 2,
          my: 5,
        }}
      >
        <Typography fontWeight={600}>Todo List</Typography>

        {savedTask &&
          savedTask.map((task) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #969696ff",
                  my: 1,
                }}
                key={task.id}
              >
                <Box
                  sx={{
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    onClick={() => handleChecked(task.id)}
                    type="checkbox"
                    sx={{ border: 0, width: "5%" }}
                    value={task.checked}
                  />
                  <Typography width={"60%"} textAlign={"start"} ml={1}>
                    {task.checked ? <del>{task.task}</del> : task.task}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 100 }}>
                    <Select
                      value={task.priority}
                      onChange={(e) =>
                        handlePriority(
                          task.id,
                          e.target.value as "high" | "medium" | "low"
                        )
                      }
                      sx={{
                        color: getPriorityColor(
                          task.priority as "high" | "medium" | "low"
                        ),
                        fontWeight: "bold",
                      }}
                    >
                      <MenuItem value="high" sx={{ color: "#ff4444" }}>
                        High
                      </MenuItem>
                      <MenuItem value="medium" sx={{ color: "#ff9900" }}>
                        Medium
                      </MenuItem>
                      <MenuItem value="low" sx={{ color: "#00aa00" }}>
                        Low
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <Button onClick={() => handleDelete(task.id)}>
                    <Delete color="error" />
                  </Button>
                </Box>
              </Box>
            );
          })}
      </Box> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          mt: 5,
        }}
      >
        {renderTask(todoTasks, "Todo List", "#ddb8a9c0 !important")}
        {renderTask(activeTasks, "Active List", "#2f89b6a7")}
        {renderTask(completedTasks, "Completed List", "#2cc7508d")}
      </Box>
    </Box>
  );
};
