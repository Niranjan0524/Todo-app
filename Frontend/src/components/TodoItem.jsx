import { TodoItemsContext } from "../store/TodoItemsContext";
import Button from "./Button";
import {useContext} from "react";
import { useState } from "react";

import { todoItemToClientModel } from "../utils/ModelUtil";

const TodoItem = ({ id, todoText, todoDate ,completed}) => {
  
const [isChecked, setIsChecked] = useState(completed);

  const formattedDate = new Date(todoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const {deleteTodoItem} = useContext(TodoItemsContext);

  const deleteHandler = () => {    
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      deleteTodoItem(data._id);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const checkHandler = () => {
    
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers:{'content-type':'application/json'},
      body:JSON.stringify({completed: !isChecked}),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        
        const item = todoItemToClientModel(updatedItem);
        
        setIsChecked(updatedItem.completed);
      })
      .catch((err) => {
        console.log("Error in fetching",err);
      });

  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4 transition-transform transform hover:scale-105 max-w-2xl mx-auto">
      <input
        type="checkbox"
        className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        onClick={checkHandler}
        checked={isChecked}
      />
      <div className={"flex-1 text-gray-800 truncate" + (isChecked ? " line-through" : "")}>
        <span className="font-semibold">Task:</span> {todoText}
      </div>
      <div className="flex-none text-gray-500 ml-4">
        <span className="font-semibold">Due:</span> {formattedDate}
      </div>
      <div className="flex-none ml-4">
        <Button btnType="danger" btnText="Delete" handler={deleteHandler} />
      </div>
      <div className="flex-none ml-4">
        <Button
          btnType="primary"
          btnText="Edit"
          handler={() => alert("Edit functionality not implemented yet")}
        />
      </div>
    </div>
  );
};

export default TodoItem;
