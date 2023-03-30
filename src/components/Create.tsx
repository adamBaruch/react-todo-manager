import {useState} from 'react';
import { CreateProps } from '../utils/types';

const Create = ({add}: CreateProps) => {
    const [inputValue,setInputValue] = useState('');

    function handleClick() {
        if(inputValue) add(inputValue);
    }
    return (
        <div className='flex gap-3 text-lg'>
            <div className=''>
                <label htmlFor="input" className="ml-10 my-5 text-lg w-1/3">Insert New Todo: </label>
                <input 
                    className="border border-black"
                    onChange={(e) => setInputValue(e.target.value)} id="input" type="text" value={inputValue} 
                />
            </div>
            <button className='bg-blue-600 px-5 py-1 rounded-md text-base text-white' onClick={handleClick}>Add</button>
        </div>
    )
};

export default Create;

