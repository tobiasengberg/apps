import './App.css'
import Display from "./components/Display.tsx";

function App() {

    const data = [{id: 1, name: "Product 1", description: "This is a product", price: 100}];

  return (
    <>
        <Display products={data}/>
    </>
  )
}

export default App
