import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const addTodo = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleEdit = (e, id)=>{
    let index = todos.findIndex(item=>{
      return item.id == id
    })
    let str = todos[index].todo
    setTodo(str)
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
      return item.id == id
    })
    let newTodos = [...todos]
    todos[index].isCompleted = !todos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }  

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
        <h1 className="text-center font-bold text-2xl">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col">
          <h2 className="text-xl font-bold">Add a todo</h2>
          <input name="todo" value={todo} onChange={handleChange} className="w-full px-5 py-1 my-3 rounded-full" type="text" />
          <button disabled={todo.length <= 3} onClick={addTodo} className="bg-violet-800 hover:bg-violet-950 text-white font-bold rounded-md p-2 py-1 text-sm disabled:bg-violet-500 cursor-pointer">Save</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked = {showFinished} /> Show Finished
        <h2 className="text-xl font-bold rounded-md my-4">Your todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className="m-5">No todos to display</div> }
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="w-full todo flex justify-between  my-3">
              <div className="flex gap-5">
                <input name={item.id} type="checkbox" onChange={handleCheckbox} checked={item.isCompleted}/>   
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button name={item.id} onClick={(e)=> handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 text-white font-bold rounded-md p-2 py-1 text-sm mx-1"><FaEdit /></button>
                <button name={item.id} onClick={(e)=>handleDelete(e, item.id)} className="bg-violet-800 hover:bg-violet-950 text-white font-bold rounded-md p-2 py-1 text-sm mx-1"><MdDelete /></button>
              </div>
            </div>

          })}
        </div>
      </div>
    </>
  )
}

export default App
