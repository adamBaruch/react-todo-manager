export type Item = {
    id: number;
    title: string;
    completed: boolean;
}

export type TodoProps = {
    item: Item;
    update: Function;
    remove: Function;
}

export type TodoListProps = {
    list: Item[];
    update: Function;
    remove: Function;
}

export type CreateProps = {
    add: Function;
}