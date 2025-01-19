import { useContext } from "react";
import { TodoItemsContext } from "../store/TodoItemsContext";
import { useEffect } from "react";
import { useState } from "react";
import { todoItemToClientModel } from "../utils/ModelUtil";

const LoadItems = () => {
  const { todoItems, addAllTodoItems } = useContext(TodoItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    fetch("http://localhost:3000/todos")
      .then((res) =>{         
        console.log(res)
        return res.json();
      })
      .then((items) => {
        console.log("Loaded items:",items);
        const newItems = items.map(todoItemToClientModel);
        addAllTodoItems(newItems);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!isLoading && todoItems.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Enjoy your day</p>
      )}
    </>
  );
};

export default LoadItems;
