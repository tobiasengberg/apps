import React from 'react';

const StatusEntry = ({entry}) => {
    return (
        <div>
            <p>{entry.status}</p>
        </div>
    );
};

export default StatusEntry;