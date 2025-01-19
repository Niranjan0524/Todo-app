const express = require('express');

const itemsRouter=express.Router();

const {postTodoItem} = require("../controllers/itemController");

const {getTodoItems} = require("../controllers/itemController");

const {postDeleteTodoItem} = require("../controllers/itemController");

const {patchUpdateTodoItem} = require("../controllers/itemController");


itemsRouter.get("/todos",getTodoItems);
itemsRouter.post("/todos",postTodoItem);
itemsRouter.delete("/todos/:id",postDeleteTodoItem);

itemsRouter.patch("/todos/:id", patchUpdateTodoItem);


exports.itemsRouter=itemsRouter;