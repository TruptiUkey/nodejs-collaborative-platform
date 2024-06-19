const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
//const {jwtAuthMiddleware} = require('../jwt');
//const User = require('../models/user');

router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newTask = new Task(data);
        const response = await newTask.save();
        console.log('Task Created Successfully!');
        res.status(200).json({message:"Task Created Successfully",task:response});
        if(!response){
            console.log('Empty data cannot be saved!');
            res.status(500).json({error:'Empty data cannot be saved'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.get('/',async (req,res)=>{
    try{
        const response = await Task.find();
        console.log('Task find Successfully!');
        res.status(200).json({message:"Task Found Successfully",task:response});
        if(!response){
            console.log('Task not found!');
            res.status(404).json({error:'Task not found'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.get('/:taskId',async (req,res)=>{    
    try{
            const taskId = req.params.taskId;
            const response = await Task.findById(taskId);
            console.log('Found the Task with the provided id.');
            res.status(200).json({message:"Found the Task with the provided id",task:response});
    
            if(!response){
                console.log('Task not found!');
                res.status(404).json({error:'Task not found'});
            }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// router.post('/:taskStatus',async (req,res)=>{
//     try{
//         const taskStatus = (req.params.taskStatus);
//         console.log("task Status is==>" ,taskStatus);
//         if(taskStatus =='Not Started' || taskStatus == 'In Progress' || taskStatus=='Completed'){
//             const response = await Task.find({status:taskStatus});
//             console.log('Data find Successfully!');
//             res.status(200).json(response);
//         }else{
//             res.status(404).json({error:'invalid taskStatus'});
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:'Internal Server Error'});
//     }
// })


router.put('/:taskId',async (req,res)=>{     
    try{
        const taskId = req.params.taskId;
        const updatedTaskData = req.body;

        const response = await Task.findByIdAndUpdate(taskId,updatedTaskData,{
            new: true,  
            runValidators: true    
        })
        if(!response){
            res.status(404).json({error:'Task not found'});
        }

        console.log('Task updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


router.delete('/:taskId',async (req,res)=>{    
    try{
        const taskId = req.params.taskId;
        const response = await Task.findByIdAndDelete(taskId);

        if(!response){
            res.status(404).json({error:'Task not found'});
        }
        console.log('Task deleted');
        res.status(200).json({message:'Task deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

module.exports = router;
