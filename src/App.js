import React, {useCallback, useEffect, useState, useMemo} from "react";
import Form from './Components/Form/Form'
import './App.css'
import './index.css'

function App() {
  
  const [todos,setTodos] = useState([])
  const [allTodos, setAllTodos] = useState(0);
  const [allComplete,setAllComplete] = useState(0)
  const [status,setStatus] = useState('false')

  
  useEffect(() => {
    setAllComplete(todos.filter(todo => todo.confirmed === true).length)
  },[todos])
  
  
  const putTodo = useCallback((value) => {
    if(value) {
      setTodos([...todos, {id: Date.now(), title: '', text: value, confirmed: false}])
      setAllTodos(allTodos + 1)
    }
    else {
      alert('Введите текст')
    }
  },[todos,allTodos]);

  const toggleTodo = useCallback((id) => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo;
    
        return {
          ...todo,
          confirmed: !todo.confirmed
        }
    }))
  },[todos]);

  const removeTodo = useCallback((id) => {
    setTodos(todos.filter(todo => todo.id !==id))
    setAllTodos(allTodos => allTodos - 1)
  },[todos])

  const handleClick = useCallback(() => {
    setStatus(status => !status);
  },[])

  const clearTodos = useCallback(() => {
    setTodos([]);
    setAllTodos('');
  },[])
  

 const memoizedTodoList = useMemo(() => {
    return (
      <ul className="todos">
      {
        todos.map(todo => {
          return (
            <li className={todo.confirmed ? 'todo_confirmed' : 'todo_list'} key={todo.id} onClick={(e) => {
              toggleTodo(todo.id)
              handleClick();
              }}> 
               {todo.text}
               <span className="status">   - Status:{todo.confirmed? 'true' : 'false'}</span>
               <button className="deletetodo" onClick={e => {
                e.stopPropagation();
                removeTodo(todo.id);
               }}>X</button>
               
            </li> 
           )
        })
      }
      <div className="info">
        <span>All Todos:{allTodos}</span>
        <span>Complete: {allComplete}</span>
      </div>
      <button className="btn" onClick={clearTodos}>Clear All</button>
</ul>
    )
 }, [todos ,allTodos ,allComplete, clearTodos,handleClick,removeTodo,toggleTodo])

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">TodoList</h1>
        <Form 
          putTodo={putTodo}
        />
        {memoizedTodoList}
      </div>
    </div>
  );
}

export default App;
