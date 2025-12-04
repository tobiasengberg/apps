
import './App.css'
import StatusEntry from "./components/StatusEntry.jsx";
import {useState} from "react";
import NavBar from "./components/NavBar.jsx";
import UpdateStatus from "./components/UpdateStatus.jsx";

function App() {

    const [status, setStatus] = useState([{
        status: "We have started a business today",
        time: "2025-12-04-12:00"
    }]);
    const [menuChoice, setMenuChoice] = useState(1);

  return (
    <div>
        <NavBar setMenuChoice={setMenuChoice} />
        <div className="m-auto container">
        {menuChoice === 1 ?
        status.length > 0 && status.map( (entry) => (
            <StatusEntry entry={entry} />
        )) :
            <UpdateStatus setStatus={setStatus} status={status}/>
        }
        </div>
    </div>
  )
}

export default App
