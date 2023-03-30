import React, { useState } from "react";
import type {TodoProps} from '../utils/types';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin2Line } from 'react-icons/ri';

const Todo = ({item, update, remove }: TodoProps) => {
    const [completed ,setCompleted] = useState(item.completed);
    const [editing ,setEditing] = useState(false);
    const [title ,setTitle] = useState(item.title);
    
    function handleCheckboxClick(v: boolean): void {
        setCompleted(v);
        update({...item,completed: v});
    }
    function enableEdit(){
        setEditing(!editing);
    }
    function handleDelete(){
        remove(item.id);
    }
    function handleTitleChange(e: React.KeyboardEvent) {
        if(e.key === 'Enter'){
            setEditing(false);
            update({...item, title});
        }
        console.log(e.key, e.metaKey);
    }
    return (
        <div key={item.id} className='w-full py-3 px-4 bg-blue-100 rounded-md my-1 flex justify-between items-center'>
            <div className="w-full flex">
                <input 
                    type="checkbox" 
                    className="mr-5" 
                    checked={completed} 
                    onChange={(e) => handleCheckboxClick(e.target.checked)} 
                />
                { editing ?       
                    <input type="text" className="flex-1 px-1 mr-10" value={title} onChange={(e) => setTitle(e.target.value)} onKeyUp={handleTitleChange}/>
                    : <span className="px-1">{item.title}</span>
                }    
            </div>
            <div className="flex">
                <button className="hover:bg-pink-500 hover:text-white px-2 py-1 rounded-sm h-6" onClick={enableEdit}>
                    <AiOutlineEdit />
                </button>
                <button className="hover:bg-red-500 hover:text-white px-2 py-1 -mr-3 rounded-sm h-6" onClick={handleDelete}>
                    <RiDeleteBin2Line/>
                </button>    
            </div>
        </div> 
    );
}

export default Todo;