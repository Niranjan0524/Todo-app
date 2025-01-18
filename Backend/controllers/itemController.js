const Todo = require('../models/TodoItem');

exports.postTodoItem=async (req,res,next)=>{
    try{

        const {task,date}=req.body;
      
        const todoItem=new Todo({task, date});
        const item= await todoItem.save();

        res.json(item);
    }
    catch(err){
      //500 is for server crashing
        res.status(500).json({message:err});
    }
};