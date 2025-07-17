import { Delete } from "@mui/icons-material";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export interface task{
    id:string
    task:string
    checked:boolean
    priority?:'high' | 'medium' | 'low'
}
export const Todo = () => {

    const [inputTask,setInputTask]=useState('')
    const [priority,setPriority]=useState('')
    const [savedTask,setSavedTask]=useState<task[]>([])

    const handleAddTask =()=>{
        if(inputTask.trim() !== ''){
            const newTask:task ={
                id:uuidv4(),
                task:inputTask,
                checked:false
            }
            const newSavedTask =[...savedTask,newTask]
            localStorage.setItem('task',JSON.stringify(newSavedTask))
            setSavedTask(newSavedTask)
            setInputTask('')
        }
    }
    useEffect(()=>{
        const savedTasks = localStorage.getItem('task')
        if(savedTasks){
            setSavedTask(JSON.parse(savedTasks))
        }
    },[])

    const handleChecked = (id:string)=>{
        const updatedTasks = savedTask.map(task=>
            task.id === id?{...task,checked:!task.checked}:task
        )
        setSavedTask(updatedTasks)
         localStorage.setItem('task', JSON.stringify(updatedTasks))
    }

     const handlePrioriy = (id:string)=>{
        const updatedTasks = savedTask.map(task=>
            task.id === id?{...task,priority:task.priority}:task.priority
        )
        setSavedTask(updatedTasks)
         localStorage.setItem('task', JSON.stringify(updatedTasks))
    }
    
    
    const handleDelete =(id:string)=>{
         const updatedTasks = savedTask.filter(task=>task.id !== id)
        setSavedTask(updatedTasks)
        localStorage.setItem('task', JSON.stringify(updatedTasks))
    }
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
          display:'flex',
          px:2
        }}
      >
        <TextField
        value={inputTask}
        onChange={(e)=>setInputTask(e.target.value)}
        fullWidth
        size="small"
        />
        <Button variant="contained" sx={{width:'30%'}} size="small" onClick={handleAddTask}>Add Task</Button>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priority}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </Box>

      <Box
        sx={{
          width: "70%",
          height: "40%",
          margin: "auto",
          backgroundColor: " #e8df9eff",
          p:2,
          borderRadius:2,
          my:5
        }}
      >
        <Typography fontWeight={600}>Todo List</Typography>

{
    savedTask && savedTask.map((task)=>{
        return(
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems:'center',
            borderBottom:'1px solid #969696ff',
            my:1
          }}
          key={task.id}
        >
          <Box  sx={{
            width:'90%',
            display: "flex",
            alignItems:'center',
          }}>
            <TextField
            onClick={()=>handleChecked(task.id)}
            type="checkbox" sx={{border:0,width:'5%'}}  />
            <Typography width={'60%'} textAlign={'start'} ml={1}>{ task.checked? <del>{task.task}</del>:task.task}</Typography>
          </Box>

          <Button onClick={()=>handleDelete(task.id)}><Delete color="error"/></Button>
        </Box>
        )
    })
}
      </Box>
    </Box>
  );
};
