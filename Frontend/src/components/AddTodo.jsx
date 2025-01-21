import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import {useRef, useContext} from "react";

const AddTodo = () => {

  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const {addTodoItem} = useContext(TodoItemsContext);

  const addHandler = () => {
    const todoText = todoTextInput.current.value;
    const todoDate = todoDateInput.current.value;
    todoTextInput.current.value = '';
    todoDateInput.current.value = '';
    fetch("https://todo-app-backend-2k7j.onrender.com/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: todoText,
        date: todoDate
      })
    })
    .then(res => res.json())
    .then(serverItem => {

      console.log("server item",serverItem);  
      const {id, todoText, todoDate} = todoItemToClientModel(serverItem);
      
      addTodoItem(id, todoText, todoDate);
    })
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4 transition-transform transform max-w-md mx-auto">
      <div className="flex-1">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Todo Here"
          ref={todoTextInput}
        />
      </div>
      <div className="flex-none ml-4">
        <input
          type="date"
          ref={todoDateInput}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex-none ml-4">
        <Button btnType="success" btnText="Add" handler={addHandler} />
      </div>
    </div>
  );
};

export default AddTodo;
