const express = require('express');

const itemsRouter=express.Router();

const {postTodoItem} = require("../controllers/itemController");


itemsRouter.post("/todos",postTodoItem);

exports.itemsRouter=itemsRouter;