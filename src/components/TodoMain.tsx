import React, {useEffect, useRef, useState} from 'react';
import TodoList from './TodoList';
import Create from './Create';
import {Item} from '../utils/types';

const MAX_ID = 3000;
const DELAY = 500;

function TodoMain() {
    const [allTodos,setAllTodos] = useState<Item[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Item[]>([]);
    const [term,setTerm] = useState('');

    function updateTodo(todo: Item){
        const copy = [...allTodos];
        const index = copy.findIndex(t => t.id === todo.id)
        copy[index] = todo;
        setAllTodos([...copy]);
        filterTodos();
    }
    function handleAdd(input: string) {        
        const newTodo: Item = {
            id: Math.floor(Math.random() * MAX_ID),
            title: input,
            completed: false
        }
        setAllTodos([...allTodos, newTodo]);
        filterTodos();
    }
    function handleDelete(id: number) {
        setAllTodos([...allTodos.filter( t => t.id !== id)]);
        filterTodos();
    }

    function filterTodos () {
        console.log('term ',term);
        
        console.log('allTodos in filterTodos berfore filtering', allTodos);
        
        const filtered = allTodos.filter(t => {
            console.log(t.title);
            return t.title.includes(term);
        })
        console.log('filtered', filtered);
        // console.log('alltodos', allTodos);
        
        setFilteredTodos([...filtered]);
    }
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            setAllTodos([...json.slice(0,10)]);
            setFilteredTodos([...json.slice(0,10)]);
        });
    }, []);
    useEffect(
        () => {
            if(!allTodos.length) return;
          const timeout = setTimeout(() => {
            filterTodos();
          }, DELAY);
          return () => clearTimeout(timeout);
        },
        [term, allTodos]
      )
    return (
        <div className='w-full overflow-hidden'>
            <div>
                <div className='w-full bg-blue-300 text-2xl py-5 pl-3'>
                    Task Manager
                </div>
                <div className='mb-10 flex items-center'>
                    <div className='ml-10 my-5 text-lg'>
                        <label htmlFor="termInput">Search Todo By Name: </label>
                        <input id="termInput" type="text" className='border border-1 border-black px-1' value={term} onChange={(e) => setTerm(e.target.value)}/>
                    </div>
                    <div> 
                        <Create add={handleAdd} />
                    </div> 
                </div>
                <div className='flex justify-around relative h-4/12'>
                    <div className='w-1/3 p-3 relative'>
                        <h3 className='w-full bg-yellow-100 text-lg p-2 rounded-sm'>Open</h3>
                        <TodoList list={filteredTodos.filter(t => !t.completed)} update={updateTodo} remove={handleDelete} />
                    </div>
                    <div className='w-1/3 p-3'>
                        <h3 className='w-full bg-green-300 text-lg p-2 rounded-sm'>Done</h3>
                        <TodoList list={filteredTodos.filter(t => t.completed)} update={updateTodo} remove={handleDelete}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoMain;