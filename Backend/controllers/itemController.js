const Todo = require('../models/TodoItem');

exports.postTodoItem=async (req,res,next)=>{
    try{

        const {task,date}=req.body;
      
        const todoItem=new Todo({task, date});
        console.log(todoItem);
        const item= await todoItem.save();

        res.json(item);
    }
    catch(err){
      //500 is for server crashing
        res.status(500).json({message:err});
    }
};


exports.getTodoItems=async(req,res,next)=>{
    try{
        const items=await Todo.find();       
        res.json(items);        
    }
    catch(err){
        res.status(500).json({message:err});
    }
};


exports.postDeleteTodoItem=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const item=await Todo.findByIdAndDelete(id);
        res.json(item);
    }
    catch(err){
        res.status(500).json({message:err});
    }   
};


exports.patchUpdateTodoItem=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const item=await Todo.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        item.completed=!item.completed;
        const updatedItem=await item.save();
        res.json(updatedItem);
    }
    catch(err){
        res.status(500).json({message:err});
    }
};