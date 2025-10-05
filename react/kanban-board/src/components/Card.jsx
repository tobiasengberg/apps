import React from 'react';
import {useDraggable} from '@dnd-kit/core';

const Card = ({task}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: `draggable${task.id}`,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="kanban-board-column-card">
            <div  >{task.title}</div>
        </div>
    );
};

export default Card;