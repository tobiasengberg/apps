import React from 'react';

const StatusEntry = ({entry}) => {
    return (
        <div className="flex flex-row justify-start">
            <p>{entry.time}</p>
            <p>{entry.status}</p>
        </div>
    );
};

export default StatusEntry;