import React, {useState} from 'react';
import Column from "./Column.jsx";
import {taskList} from "../data/taskList.js";
import {DndContext} from '@dnd-kit/core';

const Board = () => {
    const [columns, setColumns] = useState([
        {id: 1, title: 'Backlog', wip: -1},
        {id: 2, title: 'To Do', wip: -1},
        {id: 3, title: 'Doing', wip: -1},
        {id: 4, title: 'Done', wip: -1},
    ]);

    const [tasks, setTasks] = useState(taskList);

    const handleLimit = (id, newLimit) => {
        const newColumns = [...columns];
        columns.find(col => col.id === id).wip = newLimit;
        setColumns(() => newColumns);
    };

    const getTasks = (id) => {
        return tasks.filter(task => task.category === id);
    }

    const handleDragEnd = (event) => {
        const {over, active} = event;
        if(!over) return;
        const updatedTasks = [...tasks];
        let target = Number(over.id.substring(9));
        let projectile = updatedTasks.find(task => task.id === Number(active.id.substring(9)));
        if(target === Number(projectile.category)) return;
        let wip = columns.find(column => column.id === Number(target)).wip;
        if(wip < 1 || getTasks(target).length < wip)
        {
            projectile.category = target;
            setTasks(updatedTasks);
        }

    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="kanban-board">
                {columns.map((column) => <Column column={column} setLimit={handleLimit} key={column.id} tasks={getTasks(column.id)}/>)}
            </div>
        </DndContext>
    );
};

export default Board;