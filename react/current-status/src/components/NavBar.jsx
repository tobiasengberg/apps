import React from 'react';

const NavBar = ({setMenuChoice}) => {
    return (
        <nav>
            <ul className="flex flex-row justify-center py-3">
                <li className="font-bold px-10 text-slate-500 hover:text-slate-700" onClick={() => setMenuChoice(1)}>Status</li>
                <li className="font-bold px-10 text-slate-500 hover:text-slate-700" onClick={() => setMenuChoice(2)}>Handle</li>
            </ul>
        </nav>
    );
};

export default NavBar;