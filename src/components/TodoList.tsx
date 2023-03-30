import Todo from './Todo';
import {TodoListProps} from '../utils/types';

const TodoList = ({list, update, remove} : TodoListProps) => {
    return (
        <div className="flex flex-col">
            {
                list.map((item) => {
                    return (
                        <Todo key={item.id} item={item} update={update} remove={remove} />          
                    )
            })}
        </div>
    );
}

export default TodoList;