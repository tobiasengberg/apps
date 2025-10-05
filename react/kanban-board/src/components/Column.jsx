import React from 'react';
import { useForm} from "react-hook-form"
import Card from "./Card.jsx";
import {useDroppable} from '@dnd-kit/core';

const Column = ({column, setLimit, tasks}) => {
    const {isOver, setNodeRef} = useDroppable({
        id: `droppable${column.id}`,
    });
    const style = {
        backgroundColor: isOver && 'lightblue',
    };
    const {
        register,
        handleSubmit
    } = useForm();
    const onSubmit = (data) => {
        setLimit(column.id, data.limit);
    }
    return (
        <div ref={setNodeRef} style={style} className="kanban-board-column">
            <div className="kanban-board-column-header">
                <p>{column.title}</p>
                <p>{column.wip > -1 && column.wip}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="number" {...register("limit")} />
                    <input type="submit" />
                </form>

            </div>
            <div className="kanban-board-column-body">
                {tasks.map((task) => <Card key={task.id} task={task} />)}
            </div>
        </div>
    );
};

export default Column;